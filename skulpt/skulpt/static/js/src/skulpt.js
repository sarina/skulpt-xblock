/* Javascript for SkulptXBlock. */
function SkulptXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */

	function builtinRead(x) {
	    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
		throw "File not found: '" + x + "'";
	    return Sk.builtinFiles["files"][x];
	}

	// Here's everything you need to run a python program in skulpt
	// grab the code from your textarea
	// get a reference to your pre element for output
	// configure the output function
	// call Sk.importMainWithBody()
	function runit() { 
	    var prog = document.getElementById("yourcode").value; 
	    var mypre = document.getElementById("output"); 
	    mypre.innerHTML = ''; 
	    Sk.canvas = "mycanvas";
	    Sk.pre = "output";
	    Sk.configure({output:outf, read:builtinRead}); 
	    eval(Sk.importMainWithBody("<stdin>",false,prog)); 
	} 
    });
}
