$(document).ready(function () {
  setInterval(function () {
    $.ajax({
      type: "POST",
      url: $("#checkPageReloadUrl").val(),
      dataType: "JSON",
      success: function (response) {
        if (response.reload === "1") {
          location.reload();
        }
      },
    });
  }, 3000);
});
$(document).ready(function () {
  setTimeout(function () {
    $(".loader-container").addClass("d-none");
  }, 3500); // 3 seconds in milliseconds
});
$(window).on("load", function () {
  // Show loader while images and other external resources are loading
  $(".loader-container").removeClass("d-none");
  // Set a timeout to ensure loader is displayed for a minimum of 3 seconds
  $(document).ready(function () {
    // Mark the document as loaded
    setTimeout(function () {
      $("body").addClass("loaded");
    }, 3500); // 3 seconds in milliseconds
  });
});
// var myWindow;

// $(document).ready(function() {
//     // Function to open a new window
//     function openNewWindow() {
//         myWindow = window.open('', '_self'); // Open a new window with a blank URL
//     }

//     // Function to close the window
//     function closeWindow() {
//         if (myWindow) {
//             myWindow.close(); // Close the window if it exists
//         } else {
//             window.close(); // Close the current window if the new window wasn't opened
//         }
//     }

//     // Event listener for the button to open a new window
//     $("#openWindowButton").on("click", openNewWindow);

//     // Event listener for the button to close the window
//     $("#closeWindowButton").on("click", closeWindow);
// });

$(document).ready(function () {
  // Function to trigger Control + W key combination
  $("#closeWindowButton").click(function () {
    console.log("Clicked");
    // Trigger keydown event for Control key
    $(document).trigger($.Event("keydown", { keyCode: 17, ctrlKey: true }));
    // Trigger keydown event for W key
    $(document).trigger($.Event("keydown", { keyCode: 87 }));
  });
});
