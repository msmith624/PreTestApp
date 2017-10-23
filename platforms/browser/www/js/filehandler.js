var filehandler=    
{
    loadtheTestBank: function()
    {
        var url = "testBank.xlsx";
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function(e) 
        {
            var arraybuffer = oReq.response; // array buffer for the SheetsJS

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]); // loading the array
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"}); // create the workbook that for SheetsJS

            /* DO SOMETHING WITH workbook HERE */
            var first_sheet_name = workbook.SheetNames[0];
            /* Get worksheet */
            var worksheet = workbook.Sheets[first_sheet_name];
        
            console.log("this means it worked");
            var columName = ['A','B','C','D','E','F','G','H'] // set column name for the excell sheet
            var qdata = [1,1,1,1,1,1,1,1]; // array for data query
            var i =1;
            var address_of_cell;
            var desired_cell;
        
        
            var desired_value =1;// initialize for non null value
            console.log('loading the question table');
            while(typeof desired_value!== "undefined") // loop to load the info while are still entries in the file
                {
                for(x=0;x<8;++x) // runs through a single line of the excell file
                    {
                        address_of_cell = columName[x]+i; // build the address of the cell we want
                        desired_cell = worksheet[address_of_cell]; // point to the cell we want    
                        desired_value = (desired_cell ? desired_cell.v : undefined);  // gets the value of the cell or returns undefined
                        qdata[x] = desired_value; // place data into array for query
                    }
              
                questionTableHandler.addQuestionToTable(qdata[0],qdata[1],qdata[2],qdata[3],qdata[4],qdata[5],qdata[6],qdata[7]); 
                ++i;
                desired_cell = worksheet['A'+i]; // point to the cell we want    
                desired_value = (desired_cell ? desired_cell.v : undefined);  //look forward for empty attribute
                }// end while loop
            console.log('question table has loaded');
        };// end of onload

        oReq.send(); // initiate request
    }// end loadtheTestBank

};// end filehandler



