import { ConnectionServiceProvider } from '@app/clients';
import { ConnectionService } from '@app/proto/connection';
import { DynamicOidcAuthGuard, StrategyService } from '@app/shared';
import { isUrl } from '@app/utils';
import {
    Controller,
    Get,
    Logger,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger('AuthController');

    constructor(
        private readonly configService: ConfigService,
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly strategyService: StrategyService,
    ) {
        //
    }

    @Post('login')
    async login(
        @Req() req: Request,
        @Res() res: Response,
        @Query('cid') cid: string,
    ) {
        if (!cid) {
            this.logger.debug(`login: error occured, missing cid`);
            return this.handleLogoutError(res, new Error('Invalid connection'));
        }

        this.logger.debug(`login: cid=${cid}`);
        const { connection, error } = await this.connectionServiceProvider
            .getService()
            .GetConnection({ cid });

        if (error) {
            this.logger.debug(`login: error occured, error=${error?.message}`);
            return this.handleLogoutError(res, new Error('Invalid connection'));
        }

        if (!connection) {
            this.logger.debug(
                `login: error occured, error=Failed to fetch connection, service disconnected?`,
            );
            return this.handleLogoutError(
                res,
                new Error('Internal Server Error'),
            );
        }

        this.logger.debug(`login: connection found, type=${connection.type}`);

        const strategy = this.strategyService.getStrategy(connection);
        strategy.authenticate(req, { callbackURL: '/auth/oidc/callback' });
    }

    @Get('logout')
    logout(
        @Req() req: Request,
        @Res() res: Response,
        @Query('redirect_uri') redirectUri?: string,
    ) {
        req.logout((err) => {
            if (err) {
                this.logger.error(`Logout error: ${err.message}`, err);
                return this.handleLogoutError(res, err);
            }

            const safeRedirectUri = this.getSafeRedirectUri(redirectUri);
            res.redirect(safeRedirectUri);
        });
    }

    @UseGuards(DynamicOidcAuthGuard)
    @Get('oidc/callback')
    oidcCallback(
        @Req() req: Request,
        @Res() res: Response,
        @Query('redirect_uri') redirectUri?: string,
    ) {
        const safeRedirectUri = this.getSafeRedirectUri(redirectUri);
        return res.redirect(safeRedirectUri);
    }

    private getSafeRedirectUri(redirectUri?: string): string {
        if (redirectUri && isUrl(redirectUri)) {
            // Additional check to ensure the URL is a part of the allowed list
            // Implement your logic here to validate against a list of allowed URLs
            if (this.isAllowedUrl(redirectUri)) {
                return redirectUri;
            }
        }
        return this.getDefaultRedirectUri();
    }

    private getDefaultRedirectUri(): string {
        const defaultRedirectUri = this.configService.get(
            'app.loggedInCallbackUri',
        );
        if (defaultRedirectUri && isUrl(defaultRedirectUri)) {
            return defaultRedirectUri;
        }
        return '/';
    }

    private handleLogoutError(res: Response, err: Error): void {
        const errorRedirectUri = this.configService.get('app.errorUri');
        if (!errorRedirectUri || !isUrl(errorRedirectUri)) {
            // Fallback in case of misconfiguration
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        const errorURL = new URL(errorRedirectUri);
        errorURL.searchParams.set('error_code', '500');
        errorURL.searchParams.set('error_message', 'Logout failed');
        errorURL.searchParams.set('error_details', err.message);

        res.redirect(errorURL.toString());
    }

    private isAllowedUrl(url: string): boolean {
        // Implement your logic here to check if the URL is allowed
        // Example: return allowedUrls.includes(url);
        return true; // Placeholder, replace with actual logic
    }
}
