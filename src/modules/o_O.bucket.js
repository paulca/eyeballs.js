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
       if (!this.in_batch_operation) {
         this.event_handler.triggerHandler('changeData', ['add', el, this]);
       }
     },
     
     get: function(index) {
       return this.backend[index]
     },
     
     size: function() {
       return this.backend.length
     },
     
     each: function(callback) {
       for (var i = 0; i < this.backend.length; i++){
        callback(this.backend[i], i)
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
     
     remove: function(callback) {
       var toRemove = []
       
       this.each(function(el, i) {
         if (callback(el)) {
           toRemove.push(i)
         }
       })
       
       for (var i = 0; i < toRemove.length; i++) {
         this.backend.splice(toRemove[i] - i, 1)
       }
     },
     
     data_changed: function(callback) {
       this.event_handler.bind('changeData', callback)
     },
     
     to_model_hash: function() {
       return {size: this.size()}
     },
     
     batch_operation: function(callback) {
       this.in_batch_operation = true
       callback(this)
       this.event_handler.triggerHandler('changeData', ['batch', null, this])
       this.in_batch_operation = false
     },
     
     unbind: function() {
       // this.event_handler.unbind()
       this.each(function(el) {
         if (el.unbind) {
           el.unbind()
         }
       })
     }
   }
   
   o_O.extend(bucket, instance_methods)
   return bucket
 } 
}