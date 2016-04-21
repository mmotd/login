var id;

function setId(id) {
    this.id = id;

    if (document.getElementById('user_id')) {
        document.getElementById('user_id').innerHTML = this.id;
    }
}

exports.setId = setId;