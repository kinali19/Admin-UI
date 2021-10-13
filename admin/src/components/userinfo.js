import { useState } from "react"; 
import Table from "./TableComponents/table";
import editIcon from '../assets/edit.png'
import deleteIcon from '../assets/delete.png'
import doneIcon from '../assets/done.png'

function UserInfo(props) {
  const pageLimit = 10
  const [data, updateList] = useState(props.users);
  const [ids, selectedIds] = useState([]);
  const [isChecked, checked] = useState(false);
  const [filter, setFilter] = useState(false);
  const [page, setPage] = useState(0);
  const [editedRowId, setEditedRowId] = useState(null);



  const headerOptions = ['','Name','Email','Role','Actions']

  const handleEditClick =(value) => {
    setEditedRowId(value);
  }


  const deleteRow = (id) => {
      const filtered = data.filter(item => id > 0 ? item.id !== id : !ids.includes(item.id))
      updateList([...filtered])
      checked(false)
  }

  const selectAll = (e) => {
    checked(e.target.checked)
    if(e.target.checked){
      // if(filter)
      //     updateList([...list]) 
     const list = checkPagination(getAllRecords())
      const selected = list.map(a => a.id);
      selectedIds(selected)
    }
    else
      selectedIds([])
    
      
  }
  const onselectionchange = (id,event) => {
    selectedIds(event.target.checked ?
      oldArray => [...oldArray, id] : oldArray=> oldArray.filter(item => item !== id))
  }
    

  const filterBy = item => {
    if (filter.length > 0) {
        return item.role.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase()) || item.email.toLowerCase().includes(filter.toLowerCase());
    }
  }

  const checkPagination = records => {
    const offset = page * pageLimit;
    return records.slice(offset, offset + pageLimit);
  }

  const getAllRecords = () => {
    const list = filter ? data.filter(item => filterBy(item))  : data;
     return list
  }

  const  editRecord =(key,value) => {
    const objIndex = data.findIndex(item => item.id === editedRowId)
    if(key === "name")
      data[objIndex].name = value;
    else if(key === "email")
      data[objIndex].email = value;
      else if(key === "role")
      data[objIndex].role = value;
  }

    const createRow = row => {
      const CellContent = (value) => {
        const isCurrentTaskEdit = row.id === editedRowId;
  
        return (
          <td>
            {isCurrentTaskEdit ? (
              <input style={{ width: "90%" }} defaultValue={value.children}  onChange={(e) => editRecord(value.name,e.target.value)}/>
            ) : (
              value.children
            )}
          </td>
        );
      };
  
        return (
          <tr key={row.id} style={{ backgroundColor: ids.indexOf(row.id) > -1 ? 'lightgray' : '' }}>
              <td><input type="checkbox" checked={ids.includes(row.id)} onChange={(event) => onselectionchange(row.id,event)}/></td>
              <CellContent name="name">{row.name}</CellContent>
              <CellContent name="email">{row.email}</CellContent>
              <CellContent name="role">{row.role}</CellContent>
              <td>
                <button className="btn btn-edit" 
                onClick={() => 
                handleEditClick(editedRowId === row.id ? null : row.id)}>{editedRowId === row.id ? <img src={doneIcon} alt="done"/> : <img src={editIcon} alt="edit"/>}</button>
              <button className="btn btn-delete" onClick={() => deleteRow(row.id)}><img src={deleteIcon} alt="delete"/></button>
              </td>
          </tr>
        )
      };
    
      const header = (
        <tr>
          {headerOptions.map((header,index) => (
            <th key={index}>
              {index === 0 ? <input type="checkbox" checked={isChecked} onChange={selectAll}/> :header}
            </th>
          ))}
        </tr>
      );
    
      return (
        <>
          <Table
            renderRow={row => createRow(row)}
            entries={getAllRecords()}
            header={header}
            pageLimit={pageLimit}
            deleteRows={deleteRow}
            setPage = {setPage}
            page={page}
            totalRecords = {getAllRecords().length}
            setFilter={setFilter}
            checkPagination={checkPagination}
          />
        </>
      )
}

export default UserInfo