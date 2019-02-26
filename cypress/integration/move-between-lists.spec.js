// @flow
import * as keyCodes from '../../src/view/key-codes';
import { timings } from '../../src/animation';

beforeEach(() => {
  cy.visit('/iframe.html?selectedKind=board&selectedStory=simple');
});

const shouldHaveItemWithId2 = el => {
  expect(el[0].innerText).to.have.string('id:2');
};

const shouldNotHaveItemWithId2 = el => {
  expect(el[0].innerText).not.to.have.string('id:2');
};

it('should move between lists', () => {
  // first list has item with id:2
  cy.get('[data-react-beautiful-dnd-droppable]')
    .eq(1)
    .as('first-list')
    .should(shouldHaveItemWithId2);

  // second list does not have item with id:2
  cy.get('[data-react-beautiful-dnd-droppable]')
    .eq(2)
    .as('second-list')
    .should(shouldNotHaveItemWithId2);

  cy.get('@first-list')
    .find('[data-react-beautiful-dnd-drag-handle]')
    .first()
    .should(shouldHaveItemWithId2)
    .focus()
    .trigger('keydown', { keyCode: keyCodes.space })
    .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
    // finishing before the movement time is fine - but this looks nice
    .wait(timings.outOfTheWay * 1000)
    .trigger('keydown', { keyCode: keyCodes.space, force: true });

  // no longer in the first list
  cy.get('@first-list').should(shouldNotHaveItemWithId2);

  // now in the second list
  cy.get('@second-list').should(shouldHaveItemWithId2);
});
