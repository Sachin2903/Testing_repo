import { Fragment } from "react";


import 'react-toastify/dist/ReactToastify.css';

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { IoAddOutline } from 'react-icons/io5'
import StyleSheet from './initialTask.module.css'
import { useState } from "react";
import { SecondStepTaskComp } from "../secondStep/secondStepTask";
import { useSelector ,useDispatch} from 'react-redux';
import { SeparateToDoList } from "../separateToDoList/separateToDoList";
import { websiteTodoSlice } from "../../../slice/websiteTodoSlice";
export function InitialTask() {
  const desForDragAndDrop=useDispatch();

  const [showEditBox, setShowEditBox] = useState(false);


  const arrayToBeMap = useSelector((state, action) => {
    return state.toDoListData
  });










  function handleInitialTaskClick() {

    setShowEditBox(true);
  };

  function funToHandleDrapAndDrop(result){
    const {destination,draggableId,source}=result;
    console.log(destination,draggableId,source);
    //change in root

  desForDragAndDrop(websiteTodoSlice.actions.chnageInRootAndRoot({start:source.index,end:destination.index}))
    


  }




  return (
    <Fragment>
      <div className={StyleSheet.bottomDivForList}>
        <DragDropContext onDragEnd={funToHandleDrapAndDrop}>
          <Droppable droppableId="ROOT" type="groupm">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={StyleSheet.bottomSecondDivForList}>
                {/* map start parent*/
                  arrayToBeMap.map((e, i) => (
                    <Draggable draggableId={e.id} index={i} key={i*10}>
                      {(provided) => (
                        <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                       
                                <SeparateToDoList titleForPlaceHolder={e.taskTitle} key={i} idOfComp={e.id} dustbinStatus={e.trashStatus} />
                            
                          
                        </div>
                      )}
                    </Draggable>
                  ))
                }
                {/* map end */}
                {provided.placeholder}
              </div>
              

            

            )}
          </Droppable>
        </DragDropContext>
        {/* map start  */}



        {showEditBox ? (
          <SecondStepTaskComp statePass={showEditBox} setStatePass={setShowEditBox} />

        ) : (
          <div className={StyleSheet.initialBox} onClick={handleInitialTaskClick}>
            <IoAddOutline style={{ color: "white" }} />
            <p className={StyleSheet.taskText}>Add a list</p>
          </div>
        )}
      </div>
    </Fragment>
  )
}