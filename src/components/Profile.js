import { useAuth0 } from '@auth0/auth0-react'
import React, { useState }  from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { uuid } from 'uuidv4';
import '../App.sass';

const requested = [
   { id: uuid(), content: "Engage Jupiter Express for outer solar system travel" },
   { id: uuid(), content: "Create 90 day plans for all departments in Mars Office" },
   { id: uuid(), content: "Register with the Mars Ministry of Revenue" }
   
 ];

const todo = [
  { id: uuid(), content: "Engage Saturn Shuttle Lines for group tours" },
  { id: uuid(), content: "Draft network for Mars Office" }
];
 
 const columnsFromBackend = {
   [uuid()]: {
     name: "Requested",
     items: requested
   },
   [uuid()]: {
     name: "To do",
     items: todo
   },
   [uuid()]: {
     name: "In Progress",
     items: []
   },
   [uuid()]: {
     name: "Done",
     items: []
   }
 };
 
 const onDragEnd = (result, columns, setColumns) => {
   if (!result.destination) return;
   const { source, destination } = result;

   if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

const Profile = () => {
   const { user, isAuthenticated } = useAuth0();
   const [columns, setColumns] = useState(columnsFromBackend);
   return (
      isAuthenticated && (
         <>
         <div class="content">
         <b><i><p class="title">{user.name}'s Kanban Board</p></i></b>
         <p class="subtitle">MARS COLONY PROJECT</p>
         </div>
         <br/>
         <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <>
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "#e2e2e2",
                          padding: 15,
                          width: 250,
                          borderRadius: 5,
                          minHeight: 500
                        }}
                      >
                        <h2 class="subtitle">{column.name}</h2>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      borderRadius: 5,
                                      boxShadow: 10,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "whitesmoke"
                                        : "white",
                                      color: "black",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                        
                      </div>
                      </>
                    );
                  }}
                </Droppable>
                
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
    
         </>
      )
   )
}

export default Profile
