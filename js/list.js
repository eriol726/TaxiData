﻿function list() {
    self = this;
    //---------------------------------------------------------------------------------

    //Define value names and put a tag for the specific value type
    var options = {
        valueNames: ['id', 'numberIDs'],
        item: '<li><h3 class="id"></h3><p class="numberIDs"></p></li>'
    };

    //Dummy list item
    var values = [{
        id: 'ID: ...',
        numberIDs: "Recurring dates: ..."
    }];

    //New detailList
    var detList = new List('detailList', options, values);

    //------------------------------------------------------------------------------------------
    this.update1 = function draw(data, uniqeIdAndRides, marker) {
       
        var uniqueID = [];
        var numberIDs = [];

        //Clear the old list
        detList.clear();

        console.log("start, adding items to list")

        data.properties.ids.forEach(function (d, i) {
            
            //Check if maximum number of ids have been pushed
            //Add number of ids
            if (uniqueID.length == 1500) {
                var temp = uniqueID.indexOf(data.properties.ids[i]);
                numberIDs[temp] = numberIDs[temp] + 1;
            }
            //Check if the id exits in the uniqueID array
            //If not push the id into the array
            else if (uniqueID.indexOf(data.properties.ids[i]) == -1) {
                uniqueID.push(data.properties.ids[i]);
                numberIDs.push(1);
            }
            else {
                var temp = uniqueID.indexOf(data.properties.ids[i]);
                numberIDs[temp] = numberIDs[temp] + 1;
            }
            
        })

        uniqueID.forEach(function (d, i) {
            detList.add({
                    id: "ID: " + uniqueID[i],
                    numberIDs: "Recurring dates: " + numberIDs[i]
                });
        })

        console.log("done, with adding items to list")

        var clickedTaxiStatics = 0;

        document.getElementById('detailList').addEventListener('click', function (event) {
            if ('LI' != event.target.tagName) return;
            var temp = event.target.innerText.split(":");
            var temp2 = temp[1].split("\n");
            
            //alert(temp2[0])
            var listID = parseFloat(temp2[0]);

            //send marked pont to the graph
            console.log("clicked id: ", listID);

            uniqueID.indexOf(listID);
            self.marked = true;
            var tempID = 0;
            console.log("uniqeIdAndRides.length: ", uniqeIdAndRides.length);
            // search for clicked id in the list
           // uniqeIdAndRides.forEach(function (d, i) {
            

            for (var i = 0; i < uniqeIdAndRides.length; i++) {
                if (uniqeIdAndRides[i].id == listID) {
                    console.log("found")

                    //area1.update1([uniqeIdAndRides[i]]) ; 
                    map1.click(marker, uniqeIdAndRides, uniqeIdAndRides[i]);
                   break;
                }
            }
                
               
           // })
            
        }, false);

        return clickedTaxiStatics;
        
    }
    
}