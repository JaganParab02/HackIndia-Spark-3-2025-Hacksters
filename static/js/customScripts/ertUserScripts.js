var table;

$(document).ready(function () {
  table = $("#userListTable").DataTable({
    processing: false, //Feature control the processing indicator.
    serverSide: true, //Feature control DataTables' server-side processing mode.
    regex: true,
    order: [], //Initial no order.
    ajax: {
      type: "POST",
      url: $("#dataTableURL").val(),
    },
    'columnDefs': [{
      'targets': -1,
      'searchable': false,
      'orderable': false,
      'className': 'dt-body-center',
    }],
    "scrollY": "400px",
    "scrollX": true,
  });

  /*setInterval(function () {
    table.ajax.reload(null, false);
  }, 5000);*/

  $('#checkAll').on('click', function () {
    var rows = table.rows({ 'search': 'applied' }).nodes();
    $('input[type="checkbox"]', rows).prop('checked', this.checked);
  });

  $('#userListTable tbody').on('change', 'input[type="checkbox"]', function(){
    if(!this.checked){
       var el = $('#checkAll').get(0);
       if(el && el.checked && ('indeterminate' in el)){
          el.indeterminate = true;
      }
    }
  });

});

function onSubmit() 
{
    $('#checkAll').prop('checked','');
    var selected = [];
    $.each($("input[type=checkbox]:checked"), function(){            
        selected.push($(this).val());
    });
    if (selected.length == 0) 
    {
        $.alert({
          icon: 'fa-duotone fa-exclamation',
          theme: 'modern',
          closeIcon: true,
          animation: 'scale',
          type: 'red',
          closeAnimation: 'scale',
          animationSpeed: 500,
          title: 'No box selected!',
          content: "Select atleast one box",
          autoClose: 'ok|3000',
      });
        return false;
    }
    else
    {
        $('#selection').val(selected);

    }
}

$('#printCode').submit(onSubmit)
  function saveErtUser(postURL) {
    // $(".req").each(function () {
    //   value = $(this).val();
    //   if (!value || value == "" || value == null) {
    //     $(this).addClass("border border-danger");
    //     toastr.error("This Field is Required");
    //     valid = 0;
    //     return false;
    //   } else {
    //     $(this).removeClass("border border-danger");
    //     valid = 1;
    //   }
    // });
    // if (valid == 0) {
    //   return false;
    // }
  
    var form = document.getElementById("addErtUserForm");
    var formdata = new FormData(form);
    $("#saveErtUserButton").attr("disabled", true);
  
    $.ajax({
      type: "POST",
      url: postURL,
      data: formdata,
      dataType: "JSON",
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.flag == 1) {
          console.log("success");
          $("#addErtUserModal").modal("hide");
          $("#saveErtUserButton").attr("disabled", false);
          document.getElementById('addErtUserForm').reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function editErtUser(id, postURL) {
    $.ajax({
      type: "POST",
      url: postURL,
      data: { id: id },
      dataType: "JSON",
      success: function (response) {
        $("#userId").val(response.id);
        $("#editfullName").val(response.fullName);
        $("#editemail").val(response.email);
        $("#editusername").val(response.username);
        $("#editdepartment").val(response.department);
        $("#editmobileNo").val(response.mobile);
        $("#editreferenceId").val(response.reference_id);
        $("#editcategory").val(response.category_id);
        $("#editbarcode").val(response.barcode_value);

        // $("#editdepartment").val(response.department);
        $("#editErtUserModal").modal("show");
      },
    });
  }
  
  function updateErtUser(postURL) {
    $(".editreq").each(function () {
      value = $(this).val();
      if (!value || value == "" || value == null) {
        $(this).addClass("border border-danger");
        toastr.error("This Field is Required");
        valid = 0;
        return false;
      } else {
        $(this).removeClass("border border-danger");
        valid = 1;
      }
    });
    if (valid == 0) {
      return false;
    }
  
    var form = document.getElementById("editErtUserForm");
    var formdata = new FormData(form);
    $("#editErtUserButton").attr("disabled", true);
  
    $.ajax({
      type: "POST",
      url: postURL,
      data: formdata,
      dataType: "JSON",
      contentType: false,
      processData: false,
      success: function (response) {
        if (response.flag == 1) {
          console.log("success");
          $("#editErtUserModal").modal("hide");
          $("#editErtUserButton").attr("disabled", false);
          $("#editErtUserForm").reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function deleteErtUser(id, postURL) {
    $.confirm({
      title: "Confirm!",
      content: "<span>Are you sure you want to Delete The ErtUser ? </span>",
      buttons: {
        Yes: {
          btnClass: "btn-success",
          action: function () {
            $.ajax({
              type: "POST",
              url: postURL,
              data: { id: id },
              dataType: "JSON",
              success: function (response) {
                if (response.flag == 1) {
                  location.reload();
                } else {
                  $("#displayDiv").empty();
                  $("#displayDiv").prepend(
                    "<div class='alert alert-danger alert-dismissable fade show' id='alertDiv'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><p style='margin-bottom: 0rem !important;'><strong>" +
                      response.message +
                      " </strong></p></div>"
                  );
                  $("#displayDiv").show();
                }
              },
            });
          },
        },
        No: {
          btnClass: "btn-danger",
          action: function () {
            $("#displayDiv").empty();
            $("#displayDiv").prepend(
              "<div class='alert alert-warning alert-dismissable fade show' id='alertDiv'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'></button><p style='margin-bottom: 0rem !important;'><strong>Approve Canceled !! </strong></p></div>"
            );
            $("#displayDiv").show();
          },
        },
      },
    });
  }
  
  function viewErtUser(id, postURL) {
    $.ajax({
      type: "POST",
      url: postURL,
      data: { id: id },
      dataType: "JSON",
      success: function (response) {
        $("#viewfullName").text(response.fullName);
        $("#viewemail").text(response.email);
         $("#viewdepartment").text(response.department);
        $("#viewmobileNo").text(response.mobile);
        $("#viewdreferenceNum").text(response.reference_id);
        $("#viewErtUserModal").modal("show");
      },
    });
  }
  

  function getReferenceNumber(postURL){
    id = $('#department').val();
    $.ajax({
        type: "POST",
        url: postURL,
        data: { departmentId: id },
        dataType: "JSON",
        success: function (response) {
           $('#referenceId').val(response);
        //    console.log(response);
        },
      });
  }

  