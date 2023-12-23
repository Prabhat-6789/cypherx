import { useState,useEffect } from "react";
import FlexContainer from "./flexContainer";

const ShowData = ({ data }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUser] = useState([]);
  const [tempData, setTempData] = useState({});
  const [byUser, setByUser] = useState(new Map());
  const [byPriority, setByPriority] = useState(new Map());
  const [byStatus, setByStatus] = useState(new Map());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [group,setGroup] = useState('priority');
  const [order,setOrder] = useState('title');

  var sortedByUser = new Map();
  var temp;
  
  useEffect(() => {
    setTempData(data);
    setTickets(data?.tickets);
    setUser(data?.users);

    if (tickets) {
      // by user
      const userMap = new Map();
      tickets.forEach((ticket) => {
        
        //trying to find name associated with id from user array
        const targetId = ticket.userId; // The ID you want to retrieve the name for
        //console.log("Users=> ",users);
        const foundObject = users.find(item => item.id === targetId);
        console.log("object:=> ",foundObject);

        const nameAssociatedWithId = foundObject?.name;
        if (!userMap.has(nameAssociatedWithId)) {
        userMap.set(nameAssociatedWithId, []);
        }
        userMap.get(nameAssociatedWithId).push({id:ticket.id,title:ticket.title,priority:ticket.priority});
      });
      setByUser(userMap);

      // by priority
      const priorityMap = new Map();
      tickets.forEach((ticket) => {
        if (!priorityMap.has(ticket.priority)) {
          priorityMap.set(ticket.priority, []);
        }
        priorityMap.get(ticket.priority).push({id:ticket.id,title:ticket.title,priority:ticket.priority});
      });
      setByPriority(priorityMap);

      //by status
      const statusMap = new Map();
      tickets.forEach((ticket) => {
        if (!statusMap.has(ticket.status)) {
          statusMap.set(ticket.status, []);
        }
        statusMap.get(ticket.status).push({id:ticket.id,title:ticket.title,priority:ticket.priority});
      });
      setByStatus(statusMap);
    }
  }, [data, tickets, users]);

  // Function to create a new Map with sorted keys
  const getMapWithSortedKeys = (originalMap) => {
    //trying to do mapping priority a/c to values
    const keyNameMapping = {
        0: 'No priority',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Urgent'
      };

    const sortedKeys = Array.from(originalMap.keys()).sort();
    const sortedMap = new Map();
    sortedKeys.forEach((key) => {
        const mappedKeyName = keyNameMapping[key] || `${key}`;
        sortedMap.set(mappedKeyName, originalMap.get(key));
    });
    return sortedMap;
  };
  
  //sort array of object a/c to priority
  const sortByPriority = (array) => {
    return array.sort((a, b) => b.priority - a.priority);
  };
 
  //sort array of object a/c to title
  const sortByTitle = (array) => {
    return array.sort((a, b) => a.title - b.title);
  };
  // Get a Map with sorted keys for byUser
  if(group==="status" || !selectedCategory)
  {
    sortedByUser = byStatus;
    sortedByUser = getMapWithSortedKeys(sortedByUser);
    //setByStatus(sortedByUser);
    if(order==="priority")
    sortedByUser.forEach((value, key) => {
        sortedByUser.set(key, sortByPriority(value));
      });

      else
      {
        sortedByUser = byStatus;
        sortedByUser = getMapWithSortedKeys(sortedByUser);
        sortedByUser.forEach((value, key) => {
            sortedByUser.set(key, sortByTitle(value));
          });
      }
  }

  else if(group==="user")
  {
    sortedByUser = byUser;
    sortedByUser = getMapWithSortedKeys(sortedByUser);
    //setByUser(sortedByUser);
    if(order==="priority")
    {
        const temp = sortedByUser;
        sortedByUser.forEach((value, key) => {
            sortedByUser.set(key, sortByPriority(value));
          });

          //sortedByUser = temp;
    }

      else
      {
        sortedByUser = byUser;
        sortedByUser = getMapWithSortedKeys(sortedByUser);
        sortedByUser.forEach((value, key) => {
            sortedByUser.set(key, sortByTitle(value));
          });
      }
  }

  else if(group==="priority")
  {
    sortedByUser = byPriority;
    sortedByUser = getMapWithSortedKeys(sortedByUser);
    //setByPriority(sortedByUser);

    if(order==="priority")
    sortedByUser.forEach((value, key) => {
        sortedByUser.set(key, sortByPriority(value));
      });

      else
      {
        //if(sortedByUser!=byPriority)
        sortedByUser = byPriority;
        sortedByUser = getMapWithSortedKeys(sortedByUser);
        sortedByUser.forEach((value, key) => {
            sortedByUser.set(key, sortByTitle(value));
          });
      }
  }
   
   const handleCategoryChange = (event) => {
    setSelectedCategory('display');
  };

    const handleGroupChange = (e) => {
        setGroup(e.target.value);
        //setSelectedCategory('');
    }

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
        //setSelectedCategory('');
    }

  return (
    <div>
      {/*dropdown*/}
      <div style = {{width:'150px',height:'65px'}}>
        <label htmlFor="category">Category:</label>
        <select id="category"
            value={selectedCategory}
            onChange={handleCategoryChange} 
            style={{borderRadius:'5px'}}>
                <option value="display">display</option>
                <option value={group}>group</option>
                <option value={order}>order</option>
        </select>
        {
            
            selectedCategory ?   
            (<div>
                <label htmlFor="Grouping">Grouping:</label>
                <select value={group} 
                    onChange={handleGroupChange} 
                    style={{borderRadius:'5px'}}>
                    <>
                        <option value="status">status</option>
                        <option value="user">user</option>
                        <option value="priority">priority</option>
                    </>
                </select>

                <label htmlFor="Ordering">Ordering:</label>
                <select value={order} 
                    onChange={handleOrderChange} 
                    style={{borderRadius:'5px'}}>
                    <>
                        <option value="title">title</option>
                        <option value="priority">priority</option>
                    </>
                </select>
            </div>): null
        }
      </div>

        {/*sending values of particular keys to FlexCotainer*/}
        <div style={{display:'flex',flexWrap:'wrap'}}>
            {Array.from(sortedByUser, ([key, values]) => (
                <div key={key}>
                    <div style={{textAlign:'center',marginTop:'10px'}}>{key} - {values.length}</div>
                    {
                        <FlexContainer elements={values}/>
                    }
                </div>
            ))}
        </div>
    </div>    
  );
};

export default ShowData;
