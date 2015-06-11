const React = require('react');
const CalendarStore = require("../../stores/CalendarStore");
const CalendarActions = require("../../actions/CalendarActions");
const DayView = require('./EventViews/DayView');
const Moment = require('moment');
const Flex = require('../Flex');
const PerfectScroll = require('../PerfectScroll');

Date.prototype.weekDays = function() {
    let result = [];
    let weekStartDay = new Date(this);
    weekStartDay.setDate(this.getDate() - this.getDay());
    for (let i = 0; i <= 6; i++) {
        let day = new Date(weekStartDay);
        day.setDate(weekStartDay.getDate() + i);
        result.push(day);
    }
    return result;
};


let TimeBar = React.createClass({
    render() {
        let styles = {
            time: {
                height: 60,
                lineHeight: "120px",
                textAlign: "right",
                boxSizing: "border-box"
            }
        };
        let times = [];

        for (let i = 1; i <= 11; i++) {
            times.push(<div style={styles.time}>{`${i}a`}</div>);
        }
        times.push(<div style={styles.time}>{'12p'}</div>);
        for (let i = 1; i < 12; i++) {
            times.push(<div style={styles.time}>{`${i}p`}</div>);
        }

        return (
            <div style={this.props.style}>
                {times}
            </div>
        );
    }
});

let DayHeader = React.createClass({
    propTypes: {
        date: React.PropTypes.object
    },

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    render() {
        let styles = {
            weekDay: {
                fontSize: "1.1em",
                padding: "0.2em 0.4em",
                fontWeight: 600,
                color: this.context.muiTheme.palette.disabledColor
            },
            date: {
                fontSize: "3em",
                padding: "0.1em",
                lineHeight: "1.4em"
            }
        };

        let today = new Date();
        let date = this.props.date || today;
        let weekdayDOM = <div style={styles.weekDay}>{Moment(date).format("ddd")}</div>;
        let dateDOM = <div style={styles.date}>{Moment(date).format("D")}</div>;

        if (today.toDateString() === new Date(date).toDateString()) {
            styles.date.color = this.context.muiTheme.palette.accent1Color;
        }
        return (
            <div style={this.props.style}>
                {weekdayDOM}
                {dateDOM}
            </div>
        );
    }
});

let Events = React.createClass({
    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState() {
        return {
            viewType: "week",
            date: new Date()
        }
    },

    render() {
        let {
        } = this.props;

        let styles = {
            timeBar: {
                width: 60,
                paddingRight: 10,
            },
            dayHeaderBar: {
            },
            dayHeader: {
                width: "100%",
                padding: "0.2em 0.5em",
                borderLeft: "1px solid " + this.context.muiTheme.palette.borderColor
            },
            dayContent: {
                width: "100%",
                borderLeft: "1px solid " + this.context.muiTheme.palette.borderColor
            }
        };

        let date = this.state.date ? this.state.date : new Date();

        // Date Bar
        let dateBars = null;

        let dayContents = [];

        switch (this.state.viewType) {
            case "day":
                dayContents = (
                    <Flex.Layout flex={1} style={styles.dayContent}>
                        <DayView date={Moment(date).format("YYYY-MM-DD")}/>
                    </Flex.Layout>
                );
                dateBars = <Flex.Layout flex={1} style={styles.dayHeader}>
                    <DayHeader date={Moment(date).format("YYYY-MM-DD")}/>
                </Flex.Layout>;
                break;
            case "week":
                let weekDays = date.weekDays()
                dayContents = weekDays.map(d => (
                    <Flex.Layout flex={1} style={styles.dayContent} >
                        <DayView date={Moment(d).format("YYYY-MM-DD")}/>
                    </Flex.Layout>
                ));
                dateBars = weekDays.map(d => (
                    <Flex.Layout flex={1} style={styles.dayHeader}>
                        <DayHeader date={Moment(d).format("YYYY-MM-DD")}/>
                    </Flex.Layout>
                ));
                break;
            case "4days":
                break;
            case "month":
                break;
        }

        let eventTable = (
            <Flex.Layout horitonzal>
                <TimeBar style={styles.timeBar}/>
                <Flex.Layout flex={1} stretch>
                    {dayContents}
                </Flex.Layout>
            </Flex.Layout>
        );

        return (
            <div style={{height: "100%", overflow: "auto"}}>
                <Flex.Layout horizontal style={styles.dayHeaderBar}>
                    <div style={{width: 60}}></div>
                    <Flex.Layout flex={1} stretch>{dateBars}</Flex.Layout>
                </Flex.Layout>
                <PerfectScroll style={{bottom: 0, top: 98, left: 0, right: 0, position: "absolute",
                borderTop: "1px solid " + this.context.muiTheme.palette.borderColor}} alwaysVisible>
                    {eventTable}
                </PerfectScroll>
            </div>
        );
    }
});

module.exports = Events;