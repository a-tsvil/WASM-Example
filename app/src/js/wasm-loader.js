(function() {
    'use strict';

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'src/wasm/greeter.wasm');
    xhr.send();

    xhr.addEventListener('load', function(evt) {
        var wasm2Arr = JsonToArray(JSON.parse(xhr.response));
        launchWasmModule(wasm2Arr);
    });

    function launchWasmModule(wasmModule) {
        var extractLengthPrefixedString = function(ptr) {
                var text = "",
                    length = ints[ptr >> 2],
                    i = ptr + 4 >> 1;
                while (length-- > 0) text += String.fromCharCode(chars[i++]);
                return text;
            };

        var global = {
            println: function(ptr) {
                console.log(extractLengthPrefixedString(ptr));
            }
        };

        var moduleExport = Wasm.instantiateModule(wasmModule, {
            global: global
        }).exports;

        var chars = new Uint16Array(moduleExport.memory);
        var ints = new Int32Array(moduleExport.memory);

        moduleExport.greet();
    }

    function JsonToArray(json) {
        var arr = [], index = 0;

        while(json[index] !== undefined) {
            arr[index] = json[index];
            index++;
        }

        return new Uint8Array(arr);
    }
}());
