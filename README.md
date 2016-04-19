# How to use WASM today!

## Inatallation toolchain infrastracture and compiler instructions (Ubuntu 15).

This article explain how to prepare environment and all necessary tools 
for compiling wasm in binary format from a cpp file.

1. Install emscripten and fastcomp

    Go to Emscripten [Oficial Site](http://kripken.github.io/emscripten-site/docs/building_from_source/building_emscripten_from_source_on_linux.html)
    and follow installation instructions very carefully!
    Tools what we will need for building and using emscripten:
    
    - Public JDK, NodeJS, Python2.7(Warning, don't try to use Python 3, there are many issues with interoperability beetween 2nd and 3d versions)
    - Build-Essential, Cmake, Make.
    - Fastcomp (Clang compilator for objective-C and LLVM)
    
    After building fascomp and downloading emscripten from git repo, you will need to update emscripten config file (.emscripten) LLVMROOT option 
    which will be generated automatically after first run ./emcc -h and will be placed to home dir
    
2. Install Binaryen wasm toolchain compiler library from [github](https://github.com/WebAssembly/binaryen)

    After downloading and building Binaryen (if all goes well ofcourse), you will be able
    to compile your C++ code to wasm binary format, for this purpose you need to use following command:
       
        $ emscripten-dir/./emcc source/hello_world.cpp -o dist/out.wasm -s 'BINARYEN="/home/user-name/absolute/path/to/binaryen/"'
        
    In using of foloowing instruction there few remarkable things:
    
    - In BINARYEN option path to Binaryen directory mast be absolute, or python script can't launch it.
    - Argument -o specifies output format, if you choose .wasm there will be only one binary file after compilation
    - If you choose .js there will be four files: .wast, globalMappings.wast, .js, .asm.js.
    - All these files can be threated by Binaryen itself in case of converting, compiling, assembling etc. 
 
3. After compilation you need to import newly created in browser!
    
    For that reason you will need to obtain developers version of Chrome(Canary) or Firefox(Nightly)
    you need to enable WASM in browser
    
    - chrome://flags/#enable-webassembly for Canary
    - about:config, javascript.options.wasm to true for Nightly.
    
    Almost there! One what left, is to deliver your wasm file into browser.
    For now wasm file can be only obtained by AJAX, there no static import feature yet.
    Also it need to be converted in Uint8Array before instantiating. I choose to convert it on server side 
    and then send as JSON to client.  
    To run your wasm you need to use Wasm.instantiateModule() funcion which has following signature:
     
    `` var module = Wasm.instantiateModule(wasmBinAsArr, gloabals).exports;
    
    - module - Instance of wasm binary.
    - Wasm - Gloabal variable to access wasm implemetation.
    - wasmBinAsArr - wasm binary converted to Uint8Array.
    - globals - Object which contains mapped global variables and functions to use within module.
    
Now you will be able to try this new and promising technology by yourself. Good luck and intresting expirements!
PS. My own example of wasm loading you can find in app directory, thank you.