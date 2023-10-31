package org

default allow = false

# Allow if the requester is the owner of the org
allow {
    input.method == "DELETE"
    input.user == input.resource.owner
}
