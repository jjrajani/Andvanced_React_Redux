import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
    let component;
    let props;
    beforeEach(() => {
        props = { comments: ['Purple', 'New Comment', 'Other New Comment'] };
        component = renderComponent(CommentList, null, props);
    });

    it('shows an LI for each comment', () => {
        expect(component.find('li').length).to.equal(props.comments.length);
    });

    it('shows each comment that is providerd', () => {
        props.comments.forEach(comment => {
            expect(component).to.contain(comment);
        });
        // expect(component).to.contain('New Comment');
        // expect(component).to.contain('Other New Comment');
    });
});
