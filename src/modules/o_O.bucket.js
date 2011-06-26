o_O.bucket = {
 initialize: function(name, initial_data) {
   var bucket = {
     backend: initial_data ? initial_data : [],
     event_handler: o_O.event_handler()
   }
   bucket.bucket = bucket
   bucket.event_handler.data('bucket', bucket)
   
   var instance_methods = {
     add: function(el) {
       this.backend.push(el)
       this.event_handler.triggerHandler('changeData', ['add', el, this]);
     },
     
     get: function(index) {
       return this.backend[index]
     },
     
     size: function() {
       return this.backend.length
     },
     
     each: function(callback) {
       for (var i = 0; i <= this.backend.length - 1; i++){
        callback(this.backend[i])
       }
     },
     
     contains: function(value) {
       var check = false
       this.each(function(obj) {
         if (obj == value) {
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