o_O.bucket = {
 initialize: function(name, initial_data) {
   var bucket = {
     backend: initial_data ? initial_data : [],
     event_handler: o_O.event_handler()
   }
   
   var instance_methods = {
     add: function(el) {
       this.event_handler.triggerHandler('changeData', ['add', el]);
       return this.backend.push(el)
     },
     
     get: function(index) {
       return this.backend[index]
     },
     
     size: function() {
       return this.backend.length
     },
     
     each: function(callback) {
       for (var i = 0; i <= this.backend.length - 1; i++){
        callback.apply(this.backend[i])
       }
     },
     
     contains: function(value) {
       var check = false
       this.each(function() {
         if (this == value) {
           check = true
           return
         }
       })
       return check
     },
     
     data_changed: function(callback) {
       this.event_handler.bind('changeData', callback)
     }
   }
   
   o_O.extend(bucket, instance_methods)
   return bucket
 } 
}