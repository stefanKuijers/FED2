define([], function() {
    return {
        calcDifference: function (valueA, valueB) { // calculates difference
          return (valueA - valueB);
        },

        getScriptName: function() { // returns the script name of the currentscript excecuting
            var scripts = document.getElementsByTagName('script');
            var explodedPath = scripts[scripts.length-1].attributes.src.textContent.split("/");
            
            return explodedPath[explodedPath.length-1].split(".")[0];
        },

        selectOptionByValue: function(select, value) {
          console.log(select, value);
          for(var i=0; i < select.options.length; i++) {
              if(select.options[i].value == value) select.selectedIndex = i;
           }
        },

        requireTemplate: function (templateURL) { // function shoud get me a template but never got it to work...
            var template;
            
            $.ajax({
                url: templateURL,
                method: 'GET',
                async: false,
                contentType: 'text',
                success: function (data) {
                    template = data.toString();
                }
            });
            
            return template;
        },

        //bereken de winnaar van een set, gelijkspel = tie
        setWinner: function(team1, team2, teamName1, teamName2){
            if(team1 > team2){
                return teamName1;
            }else if (team1 < team2){
                return teamName2;
            }else{
                return "Tie";
            }
        },
        
        //compressArray: verwijder lege plekken uit de array (optimize)
        compressArray: function(original) {
         
            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);
         
            // first loop goes over every element
            for (var i = 0; i < original.length; i++) {
         
                var myCount = 0;    
                // loop over every element in the copy and see if it's the same
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
                }
         
                if (myCount > 0) {
                    var a = new Object();
                    a.value = original[i];
                    a.count = myCount;
                    compressed.push(a);
                }
            }
         
            return compressed;
        },

        getTypes: function (collection, key) { // console.log("get uniqe types for key:", key, "from collection:", collection);
            return _.uniq(collection.pluck(key), false, function (value) { // get the unique values under this key 
                return typeof value === "string" ? value.toLowerCase() : value; // if it is a string return it lowerCase so no conflict in comparison will occur later. Else just return it
            });
        },

        stringBuilder : function(){
            var strings = [];

            this.append = function (string)
            {
                string = verify(string);
                if (string.length > 0) strings[strings.length] = string;
            };

            this.appendLine = function (string)
            {
                string = verify(string);
                if (this.isEmpty())
                {
                    if (string.length > 0) strings[strings.length] = string;
                    else return;
                }
                else strings[strings.length] = string.length > 0 ? "\r\n" + string : "\r\n";
            };

            this.clear = function () { strings = []; };

            this.isEmpty = function () { return strings.length == 0; };

            this.toString = function () { return strings.join(""); };

            var verify = function (string)
            {
                if (!defined(string)) return "";
                if (getType(string) != getType(new String())) return String(string);
                return string;
            };

            var defined = function (el)
            {
                // Changed per Ryan O'Hara's comment:
                return el != null && typeof(el) != "undefined";
            };

            var getType = function (instance)
            {
                if (!defined(instance.constructor)) throw Error("Unexpected object type");
                var type = String(instance.constructor).match(/function\s+(\w+)/);

                return defined(type) ? type[1] : "undefined";
            };
        }
    }
});