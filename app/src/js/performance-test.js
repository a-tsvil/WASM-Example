(function(__declare, __extern) {
  function Link() {
    this.value = 0;
    this.next = null;
  }

  function List() {
    this.first = null;
    this.last = null;
  }

  List.prototype.append = function(value) {
    var link = new Link();
    link.value = value;

    if (this.first === null) {
      this.first = link;
    }

    else {
      this.last.next = link;
    }

    this.last = link;
  };

  var demo = __extern.demo = function() {
    var list = new List();
    var count = 1500000;
    var index = 0;
    var takes = 5000;
    var attempt = 0;

    while (attempt < takes) {
      while (index < count) {
        list.append(index);
        index = index + 1 | 0;
      }

      attempt = attempt + 1 | 0;
    }

    var total = 0;
    var link = list.first;

    while (link !== null) {
      total = total + link.value | 0;
      link = link.next;
    }

    // __declare.print("WebAssembly Try!");

    return total;
  };

  console.log('JS Try!');
  console.log(demo());
}(
  typeof global !== 'undefined' ? global : this,
  typeof exports !== 'undefined' ? exports : this
));
