import { TablePagination } from "@material-ui/core";
import MaterialTable from "material-table";
import React from "react";

export default function CustomTable({columns,data ,t,paging=false,count,pageIndex,pageSize,handleChangePage,handleChangeRowsPerPage}) {

  const sttColumn = {
    title: 'STT',
    align:'center',
    width:paging && '12',
    render: (rowData) =>(paging?   pageSize * pageIndex + rowData.tableData.id + 1 :  rowData.tableData.id + 1 )
  };
   columns.splice(1, 0, sttColumn)
  return <div> <MaterialTable
  columns={columns}
  data={data}        
  localization={{
    body: {
      emptyDataSourceMessage:t('general.emptyDataMessageTable')
    },
  }}
  
  options={{
    headerStyle: {
      background: "#7467ef",
      color: "white",
      border:'1px solid #0000001f',
      padding:'10px 0px',
      textAlign:'center'
    },
  
    rowStyle: (rowData, index) => ({
      background: index % 2 === 1 ? "#EEE" : "#FFF",
  
    }),
    cellStyle: {
       border:'1px solid #0000001f',
       padding:'10px 4px'
    },
    sorting: false,
    search: false,
    padding: 'dense',
    toolbar: false,
    paging:false,
    maxBodyHeight:'750px'
  }}
/>

{paging && 
<TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={pageSize}
          page={pageIndex}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={t("general.rows_per_page")}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${t("general.of")} ${count}`
          }
        
        />}
</div>;
}
