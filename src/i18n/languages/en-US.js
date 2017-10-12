/**
 * @preserve
 * Authors: Wojciech Szymański
 * Last updated: 12.10.2017
 *
 * Description: Definition file for English language.
 */
import * as C from '../constants';

const dictionary = {
  languageCode: 'en-US',
  [C.CONTEXTMENU_ITEMS_ROW_ABOVE]: 'Insert row above',
  [C.CONTEXTMENU_ITEMS_ROW_BELOW]: 'Insert row below',
  [C.CONTEXTMENU_ITEMS_INSERT_LEFT]: 'Insert column on the left',
  [C.CONTEXTMENU_ITEMS_INSERT_RIGHT]: 'Insert column on the right',
  [C.CONTEXTMENU_ITEMS_REMOVE_ROW]: ['Remove row', 'Remove rows'],
  [C.CONTEXTMENU_ITEMS_REMOVE_COLUMN]: ['Remove column', 'Remove columns'],
  [C.CONTEXTMENU_ITEMS_UNDO]: 'Undo',
  [C.CONTEXTMENU_ITEMS_REDO]: 'Redo',
  [C.CONTEXTMENU_ITEMS_READ_ONLY]: 'Read only',

  [C.CONTEXTMENU_ITEMS_ALIGNMENT]: 'Alignment',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT]: 'Left',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER]: 'Center',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT]: 'Right',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY]: 'Justify',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP]: 'Top',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE]: 'Middle',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM]: 'Bottom',
  [C.CONTEXTMENU_ITEMS_CLEAR_COLUMN]: 'Clear column',

  [C.CONTEXTMENU_ITEMS_COPY]: 'Copy',
  [C.CONTEXTMENU_ITEMS_CUT]: 'Cut',

  [C.FILTERS_CONDITIONS_NONE]: 'None',
  [C.FILTERS_CONDITIONS_EMPTY]: 'Is Empty',
  [C.FILTERS_CONDITIONS_NOT_EMPTY]: 'Is not empty',
  [C.FILTERS_CONDITIONS_EQUAL]: 'Is equal to',
  [C.FILTERS_CONDITIONS_NOT_EQUAL]: 'Is not equal to',
  [C.FILTERS_CONDITIONS_BEGINS_WITH]: 'Begins with',
  [C.FILTERS_CONDITIONS_ENDS_WITH]: 'Ends with',
  [C.FILTERS_CONDITIONS_CONTAINS]: 'Contains',
  [C.FILTERS_CONDITIONS_NOT_CONTAIN]: 'Does not contain',
  [C.FILTERS_CONDITIONS_BY_VALUE]: 'By value',
  [C.FILTERS_CONDITIONS_GREATER_THAN]: 'Greater than',
  [C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL]: 'Greater than or equal to',
  [C.FILTERS_CONDITIONS_LESS_THAN]: 'Less than',
  [C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL]: 'Less than or equal to',
  [C.FILTERS_CONDITIONS_BETWEEN]: 'Is between',
  [C.FILTERS_CONDITIONS_NOT_BETWEEN]: 'Is not between',
  [C.FILTERS_CONDITIONS_AFTER]: 'After',
  [C.FILTERS_CONDITIONS_BEFORE]: 'Before',
  [C.FILTERS_CONDITIONS_TODAY]: 'Today',
  [C.FILTERS_CONDITIONS_TOMORROW]: 'Tomorrow',
  [C.FILTERS_CONDITIONS_YESTERDAY]: 'Yesterday',
  [C.FILTERS_CONDITIONS_FALSE]: 'False',
  [C.FILTERS_CONDITIONS_TRUE]: 'True',

  [C.FILTERS_LABELS_FILTER_BY_CONDITION]: 'Filter by condition',
  [C.FILTERS_LABELS_FILTER_BY_VALUE]: 'Filter by value',
  [C.FILTERS_LABELS_CONJUNCTION]: 'And',
  [C.FILTERS_LABELS_DISJUNCTION]: 'Or',

  [C.FILTERS_BUTTONS_SELECT_ALL]: 'Select all',
  [C.FILTERS_BUTTONS_CLEAR]: 'Clear',
  [C.FILTERS_BUTTONS_OK]: 'OK',
  [C.FILTERS_BUTTONS_CANCEL]: 'Cancel',

  [C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH]: 'Search...',
  [C.FILTERS_BUTTONS_PLACEHOLDER_VALUE]: 'Value',
  [C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE]: 'Second value'
};

export default dictionary;
