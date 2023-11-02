package org

default allow = false

roles = {
    "Administrator": {
        "permissions": {"DELETE", "UPDATE", "READ", "WRITE"}
    },
    "Billing": {
        "permissions": {"READ", "UPDATE_BILLING"}
    },
    "Developer": {
        "permissions": {"READ", "WRITE"}
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
