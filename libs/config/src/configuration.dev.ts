import { baseConfiguration } from "./configuration.base";

export const devConfiguration = () => {
    require('dotenv').config();
    return baseConfiguration(false);
};
