import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AttachedTopic } from 'components';
import DraggableListWrapper from './draggableList.style';

const defaultProps = {
  draggableList: [],
  type: '',
  changeOrder: null,
  deleteItemFromSelected: null,
  isEditItem: false,
  onEdit: () => null,
};

const propTypes = {
  draggableList: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  changeOrder: PropTypes.func,
  deleteItemFromSelected: PropTypes.func,
  isEditItem: PropTypes.bool,
  onEdit: PropTypes.func,
};

class DraggableList extends PureComponent {
  onDragEnd = (result) => {
    const { changeOrder, type } = this.props;
    changeOrder(result, type);
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  handleDeleteItemFromSelected = id => (name) => {
    const { deleteItemFromSelected, type } = this.props;
    deleteItemFromSelected(id, name, type);
  };

  render() {
    const { draggableList, type, onEdit } = this.props;
    return (
      <DraggableListWrapper>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragUpdate={this.onDragUpdate}
        >
          <Droppable droppableId="droppable" type={type}>
            {provided => (
              <div ref={provided.innerRef}>
                {draggableList.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={`order${item.id}`}
                    index={index}
                  >
                    {(providedIn, snapshot) => (
                      <div
                        ref={providedIn.innerRef}
                        {...providedIn.draggableProps}
                      >
                        <span {...providedIn.dragHandleProps}>
                          <AttachedTopic
                            key={item.name}
                            id={item.id}
                            name={item.name}
                            onEdit={onEdit}
                            type={type}
                            snapshot={snapshot}
                            isEdit
                            onDelete={this.handleDeleteItemFromSelected(item.id)}
                          />
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DraggableListWrapper>
    );
  }
}

DraggableList.propTypes = propTypes;
DraggableList.defaultProps = defaultProps;

export default DraggableList;
