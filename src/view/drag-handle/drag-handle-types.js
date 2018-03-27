// @flow
import type { Node } from 'react';
import type {
  AutoScrollMode,
  Position,
  Direction,
  DraggableId,
} from '../../types';

export type Callbacks = {|
  onFocus: () => void,
  onBlur: () => void,
  onLift: ({ client: Position, autoScrollMode: AutoScrollMode }) => void,
  onMove: (point: Position) => void,
  onWindowScroll: () => void,
  onMoveForward: () => void,
  onMoveBackward: () => void,
  onCrossAxisMoveForward: () => void,
  onCrossAxisMoveBackward: () => void,
  onDrop: () => void,
  onCancel: () => void,
|}

export type DragHandleProps = {|
  // TEMP
  onFocus: () => void,
  onBlur: () => void,

  onMouseDown: (event: MouseEvent) => void,
  onKeyDown: (event: KeyboardEvent) => void,
  onTouchStart: (event: TouchEvent) => void,
  onTouchMove: (event: TouchEvent) => void,

  // Control styling from style marshal
  'data-react-beautiful-dnd-drag-handle': string,

  // Aria role (nicer screen reader text)
  'aria-roledescription': string,

  // Allow tabbing to this element
  tabIndex: number,

  // Stop html5 drag and drop
  draggable: boolean,
  onDragStart: (event: DragEvent) => void,
|}

export type Props = {|
  draggableId: DraggableId,
  // callbacks provided by the draggable
  callbacks: Callbacks,
  isEnabled: boolean,
  // whether the application thinks a drag is occurring
  isDragging: boolean,
  // the direction of the current droppable
  direction: ?Direction,
  // get the ref of the draggable
  getDraggableRef: () => ?HTMLElement,
  // whether interactive elements should be permitted to start a drag
  canDragInteractiveElements: boolean,
  children: (?DragHandleProps) => Node,
|}
