const name = document.getElementById("input");
    
function play() {

    
    const game = {

        "gamecreater": { "displayName": name.value },
        "state": 1
    }
    const rooms = database.collection("rooms");
    database.collection("rooms").where("state", "==", 1).limit(1)
        .get()
        .then(function (querySnapshot) {

            if (querySnapshot.empty) {
                console.log('Room created.');
                rooms.add(game);
                return;
            }

            querySnapshot.forEach(function (doc) {

                let transaction = database.runTransaction(t => {
                    let ref = rooms.doc(doc.id);
                    return t.get(ref)
                        .then(doc => {
                            if (doc.data().state == 1)
                                t.update(ref, { state: 2, joiner: { displayName: name.value } });
                        });
                }).then(result => {
                    console.log(doc.id + " " + "-id tai room ru orloo");
                }).catch(err => {
                    console.log('Transaction failure:', err);
                    play();
                });



            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}