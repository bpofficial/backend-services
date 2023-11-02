package member

default allow = false

roles = {
    "Administrator": {
        "permissions": {"DELETE", "UPDATE", "READ", "WRITE"}
    },
    "Billing": {
        "permissions": {"READ"}
    },
    "Developer": {
        "permissions": {"READ"}
    },
    "User": {
        "permissions": {"READ"}
    }
}

allow {
    some role_name
    role := roles[role_name]
    permission := role.permissions[_]
    input.user.roles[role_name]
    input.method == permission
}
