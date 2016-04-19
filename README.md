# How to use WASM today!

## Installation instructions for *WASM* toolchain infrastructure and compiler (Ubuntu 15).

This article explain how to prepare environment and all necessary tools
for compiling _wasm_ in binary format from a cpp file.

1. Install *emscripten* and *fastcomp*

    Go to *Emscripten* [Oficial Site](http://kripken.github.io/emscripten-site/docs/building_from_source/building_emscripten_from_source_on_linux.html)
    and follow installation instructions very carefully!
    Tools what we will need for building and using emscripten:

    - Public JDK, NodeJS, Python2.7(Warning, don't try to use Python 3, there are many issues with interoperability between 2nd and 3d versions)
    - Build-Essential, Cmake, Make.
    - Fastcomp (Clang compiler for objective-C and LLVM)

    After building *fastcomp* and downloading *emscripten* from a git repo, you will need to update emscripten configuration file (.emscripten) LLVMROOT option
    which will be generated automatically after first run ./emcc -h and will be placed to home directory.

2. Install *Binaryen* wasm toolchain compiler library from [github](https://github.com/WebAssembly/binaryen)

    After downloading and building *Binaryen* (if all goes well of course), you will be able
    to compile your C++ code to wasm binary format, for this purpose you need to use following command:

        $ emscripten-dir/./emcc source/hello_world.cpp -o dist/out.wasm -s 'BINARYEN="/home/user-name/absolute/path/to/binaryen/"'

    In using of above instruction there few remarkable things:

    - In "BINARYEN" option, path to *Binaryen* directory must be an absolute, or python script can't launch it.
    - Argument "-o" specifies output format, if you choose .wasm there will be only one binary file after compilation complete.
    - If you choose .js there will be four files: .wast, globalMappings.wast, .js, .asm.js.
    - All these files can be threated by *Binaryen* itself in case of converting, compiling, assembling etc.

3. After compilation you need to import newly created binary in browser!

    For that reason you will need to obtain developers version of Chrome(Canary) or Firefox(Nightly) or regular version of Edge.
    Than you need to enable WASM in browser:

    - chrome://flags/#enable-webassembly for Canary
    - about:config, javascript.options.wasm to true for Nightly.

    Almost there! One thing left, is to deliver your wasm file into browser.
    For now wasm file can be only obtained by _AJAX_, there no static import feature yet.
    Also it need to be converted into _Uint8Array_ before instantiating. 
    I choose to convert it on server side and then send as JSON to client.  
    To launch your wasm you need to use _Wasm.instantiateModule()_ funcion which has following signature:

        var module = Wasm.instantiateModule(wasmBinAsArr, gloabals).exports;

    - module - Instance of wasm binary.
    - Wasm - Gloabal variable to access wasm implemetation.
    - wasmBinAsArr - wasm binary converted to Uint8Array.
    - globals - Object which contains mapped global variables and functions to use within module.

Now you will be able to try this new and promising technology by yourself. Good luck and intresting expirements!
PS. My own example of wasm loading application you can find in app directory, thank you.
