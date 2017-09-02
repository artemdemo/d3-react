import React from 'react';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';
import AxisX from '../AxisX.jsx';

const dateMoment = moment('2017-03-29');
const data = [
    ['Time', 'Total'],
    [dateMoment.format('x'), 10],
    [dateMoment.subtract(2, 'hours').format('x'), 20],
    [dateMoment.subtract(3, 'hours').format('x'), 30],
];
const axisClass = 'axis-x';
const title = 'Axis title';

describe('AxisX', () => {
    const element = TestUtils.renderIntoDocument(
        <AxisX
            $$width={500}
            $$height={300}
            title={title}
            className={axisClass}
            data={data} />
    );
    const axisGroupEl = TestUtils.findRenderedDOMComponentWithClass(element, axisClass);

    it('Element rendered', () => {
        expect(axisGroupEl).toBeTruthy();
    });

    it('Title is correct', () => {
        expect(axisGroupEl.querySelector('text').textContent).toBe(title);
    });

    it('Path is correct', () => {
        expect(axisGroupEl.querySelector('path').getAttribute('d')).toBe('M0.5,6V0.5H500.5V6');
    });

    describe('Ticks', () => {
        const ticks = axisGroupEl.querySelectorAll('.tick');

        it('Correct number of ticks', () => {
            expect(ticks.length).toBe(3);
        });

        it('Transform attribute', () => {
            expect(ticks[0].getAttribute('transform')).toBe('translate(79,0)');
            expect(ticks[1].getAttribute('transform')).toBe('translate(251,0)');
            expect(ticks[2].getAttribute('transform')).toBe('translate(423,0)');
        });

        it('Dates', () => {
            expect(ticks[0].querySelector('text').textContent).toBe('1490734800000');
            expect(ticks[1].querySelector('text').textContent).toBe('1490727600000');
            expect(ticks[2].querySelector('text').textContent).toBe('1490716800000');
        })
    });
});
