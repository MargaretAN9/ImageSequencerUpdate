
module.exports = function BlobAnalysis(options, UI){


      var output;

      function draw(input, callback, progressObj) {

        progressObj.stop(true);
    

        progressObj.overrideFlag = true;
    
        var step = this;
    

        if(!options.step.inBrowser) {
    
          this.output = input;
    

          callback();
    
           }
        else{
    
  
          var priorStep = this.getStep(-1); // get the previous step to add text onto it.
    
 
          function extraManipulation(pixels){
    

            pixels = require('./blobAnalysis')(pixels, options, priorStep);

            return pixels;
    
              }
          function output(image, datauri, mimetype){

            step.output = { src: datauri, format: mimetype};

          }
    
          return require('../_nomodule/PixelManipulation.js')(input, {
    

            output: output,

            extraManipulation: extraManipulation,
            format: input.format,
             image: options.image,
            inBrowser: options.inBrowser,
            callback: callback
          });
    
    
        }}
    
      return {
    
        options: options,
    
        draw: draw,
    
        output: output,
    
        UI: UI
 
      };
    
    };