import React from 'react'
import styled from 'styled-components'
import { Link, useSearchParams } from 'react-router-dom'
import { TasksContext } from 'contexts'
import Icon from 'components/tools/icons/Icon'
import { activityFeedContent, randomColor } from 'functions/activities'
import { DropdownInput } from 'components/tools/Inputs'
import { TextButton } from 'components/tools/Button'
import { DatePicker } from 'components/tools/DatePicker'
import Pagination from 'components/tools/Pagination'
import CircleLoader from 'components/tools/CircleLoader'
import { addClass, bySelectedDate, convertToLocalDate, dateParser, divideArrayIntoSizedParts, getHourOnly, keepNewDateOnly, lastDay, reverseArray, thisDay, timeBetween } from 'functions/Utils'

interface ActivityProps {
    allActivities: any[],
    allDates: any[],
    activities: any[],
    dates: any[]
}

const Activity = () => {
    const { activities } = React.useContext(TasksContext)
    const today = React.useMemo(() => new Date().toISOString(), [])

    const [activityFeed, setActivityFeed] = React.useState<ActivityProps>({
        allActivities: [],
        allDates: [],
        activities: [],
        dates: []
    })
    const [isLoading, setLoading] = React.useState(true)

    const [filter, setFilter] = React.useState("")
    const [byDate, setByDate] = React.useState({ state: false, date: today })

    React.useEffect(() => {
        if (activities.length > 0) {
            const allDates = keepNewDateOnly(reverseArray(activities) || [])
            const reversed = reverseArray(activities) || []
            const divided = divideArrayIntoSizedParts(reversed, 20)
            setActivityFeed({
                allActivities: reversed,
                allDates: allDates,
                activities: divided,
                dates: allDates
            })
            setLoading(false)
        }
    }, [activities])

    /**
     * 
     */

    const [searchParams] = useSearchParams()
    let currentPage = Number(searchParams.get('p')) || 1

    React.useEffect(() => {
        if (currentPage > activityFeed.activities.length + 1) {
            window.location.href = `${window.location.origin}/activity`
        }
    }, [currentPage, activityFeed])

    /**
     * 
     */

    return (
        <ActivityFeed>
            <div className="kanban__header px-3">
                <h1>Fil d'activité <span>{activities.length}</span></h1>
                <div className="kanban__header-inner">
                    <div className='kanban__header-buttons'>
                        {byDate.date !== today &&
                            <TextButton className="mr-2 red xbg-red" onClick={() => {
                                setByDate(prev => ({ ...prev, date: today }))
                                setActivityFeed(prev => ({ ...prev, activities: divideArrayIntoSizedParts(activityFeed.allActivities, 20), dates: activityFeed.allDates }))
                            }}>
                                Annuler
                            </TextButton>
                        }
                        <TextButton onClick={() => setByDate(prev => ({ ...prev, state: true }))}>
                            {byDate.date !== today ? dateParser(byDate.date) : dateParser(today)}
                        </TextButton>
                    </div>
                    <DropdownInput
                        className="sm:ml-2"
                        placeholder="Par date"
                        value={filter}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
                        cross
                        onClean={() => {
                            setFilter("")
                            setActivityFeed((prev: any) => ({ ...prev, activities: divideArrayIntoSizedParts(activityFeed.allActivities, 20), dates: activityFeed.allDates }))
                        }}
                    >
                        <div onClick={() => {
                            setActivityFeed(prev => ({ ...prev, activities: divideArrayIntoSizedParts(thisDay(activityFeed.allActivities), 20) }))
                            setFilter("Aujourd'hui")
                        }}>
                            Aujourd'hui
                        </div>
                        <div onClick={() => {
                            setActivityFeed(prev => ({ ...prev, activities: divideArrayIntoSizedParts(lastDay(activityFeed.allActivities), 20) }))
                            setFilter("Hier")
                        }}>
                            Hier
                        </div>
                        <div onClick={() => {
                            setActivityFeed(prev => ({ ...prev, activities: divideArrayIntoSizedParts(timeBetween(activityFeed.allActivities, 7), 20) }))
                            setFilter("Cette semaine")
                        }}>
                            Cette semaine
                        </div>
                        <div onClick={() => {
                            setActivityFeed(prev => ({ ...prev, activities: divideArrayIntoSizedParts(timeBetween(activityFeed.allActivities, 30), 20) }))
                            setFilter("Ce mois-ci")
                        }}>
                            Ce mois-ci
                        </div>
                        <div onClick={() => {
                            setActivityFeed(prev => ({ ...prev, activities: divideArrayIntoSizedParts(timeBetween(activityFeed.allActivities, 365), 20) }))
                            setFilter("Cette année")
                        }}>
                            Cette année
                        </div>
                    </DropdownInput>
                </div>
            </div>
            <div className='page__card'>
                <div className="activity__feed-container">
                    {!isLoading ? (
                        activityFeed.activities.length > 0 ? (
                            activityFeed.activities[currentPage - 1].map((element: any, key: number) => {
                                return (
                                    <div className='activity__feed-block' key={key}>
                                        {activityFeed.dates.some(activity => activity.date === element.date.substring(0, 10) && activity.index === key) &&
                                            <div className="activity__feed-date">
                                                <Icon name="Calendar" className={randomColor()} /> {dateParser(element.date)}
                                            </div>
                                        }
                                        <div className={`activity__feed-item ${addClass((activityFeed.dates.some(activity => activity.date !== element.date.substring(0, 10) && activity.index === key + 1)), 'no-before')}`}>
                                            <div className="activity__feed-hour">
                                                {getHourOnly(new Date(element.date))}
                                            </div>
                                            <div className="timeline-badge">
                                                <Icon name="OutlineCircle" className={randomColor()} />
                                            </div>
                                            <div className="activity__feed-content">
                                                {activityFeedContent(element)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="empty-array">
                                <Icon name="Calendar" />
                                <div>Aucune activité à afficher...</div>
                            </div>
                        )
                    ) : (
                        <CircleLoader />
                    )}
                </div>
                <Pagination>
                    <div className="pagination">
                        {currentPage - 1 > 0 &&
                            <React.Fragment>
                                <Link to={`/activity`} className='arrow'>
                                    <Icon name="DoubleArrowLeft" />
                                </Link>
                                <Link to={`/activity/?p=${currentPage - 1}`} className='arrow'>
                                    <Icon name="CaretLeft" />
                                </Link>
                            </React.Fragment>
                        }
                        {[...new Array(activityFeed.activities.length)].map((_, key) => {
                            return (
                                <Link to={`/activity/?p=${key + 1}`}
                                    key={key}
                                    className={`${addClass(currentPage > (key + 3) || currentPage < (key - 1), 'hidden')} ${addClass(currentPage === (key + 1), 'active')}`}
                                >
                                    {key + 1}
                                </Link>
                            )
                        })}
                        {currentPage + 1 <= activityFeed.activities.length &&
                            <React.Fragment>
                                <Link to={`/activity/?p=${currentPage + 1}`} className='arrow'>
                                    <Icon name="CaretRight" />
                                </Link>
                                <Link to={`/activity/?p=${activityFeed.activities.length}`} className='arrow'>
                                    <Icon name="DoubleArrowRight" />
                                </Link>
                            </React.Fragment>
                        }
                    </div>
                </Pagination>
            </div>
            <DatePicker
                open={byDate.state}
                setOpen={setByDate}
                selected={byDate.date}
                onDayClick={(date: string) => {
                    setByDate({ state: false, date: date })
                    setActivityFeed(prev => ({
                        ...prev,
                        activities: divideArrayIntoSizedParts(bySelectedDate(activityFeed.allActivities, date), 20),
                        dates: [{ index: 0, date: convertToLocalDate(date) }]
                    }))
                }}
            />
        </ActivityFeed>
    )
}

export default Activity

const ActivityFeed = styled.div`
    height  : auto;
    padding : 50px;

    @media(max-width: 1200px) {
        padding : 80px 15px 50px;
    }
    @media(max-width: 768px) {
        padding : 80px 0 50px;
    }

    .page__card {
        position      : relative;
        min-height    : 70vh;
        padding       : 25px;
        background    : var(--content);
        border-radius : var(--rounded-sm);
        margin-bottom : 20px;
        box-shadow    : var(--shadow-tiny);
    }

    @media(max-width:576px) {
        .page__card {
            padding : 20px 12px;
        }
    }

    .activity__feed-container {
        position : relative;

        .activity__feed-block {
            &:last-child {
                .activity__feed-item { 
                    &:before {
                        content : none;
                    }
                }
            }
        }

        .activity__feed-date {
            display     : flex;
            align-items : center;
            padding     : 8px 0 15px;
            font-size   : 16px;
            font-weight : 600;
            svg {
                width        : 18px;
                height       : 18px;
                margin-right : 10px;
            }
        }

        .activity__feed-item {
            position       : relative;
            display        : flex;
            padding-bottom : 20px;

            &:before {
                content          : "";
                position         : absolute;
                left             : 72px;
                width            : 2px;
                top              : 0;
                bottom           : 0;
                background-color : #EBEDF3;
                z-index          : 1;
            }

            &.no-before {
                &:before {
                    content : none;
                }
            }

            .timeline-badge {
                position         : relative;
                display          : flex;
                justify-content  : center;
                align-items      : center;
                height           : 22px;
                background-color : var(--content);
                border           : 3px solid var(--content);
                margin-top       : -1px;
                z-index          : 2;

                svg {
                    width  : 22px;
                    height : 22px;
                }
            }

            .activity__feed-hour {
                font-size   : 13px;
                min-width   : 60px;
                white-space : nowrap;
                font-weight : 600;
                padding-top : 4px;
            }

            .activity__feed-content {
                display      : flex;
                padding-left : 15px;

                p {
                    color       : var(--text-secondary);
                    width       : 100%;
                    line-height : 22px;

                    span {
                        font-weight : 500;
                        color       : var(--text);
                    }
                }

                svg {
                    min-width     : 38px;
                    min-height    : 38px;
                    margin        : 0 15px;
                    padding       : 7px;
                    border-radius : 20px;
                    color         : var(--blue);
                    background    : rgba(var(--blue-rgb), 0.3);
                }
            }
        }

        @media(max-width: 567px) {
            .activity__feed-item {
                &:before {
                    left :59px;
                }
                .activity__feed-hour {
                    min-width : 46px;
                }
                .activity__feed-content {
                    padding-left : 4px;
                }
            }
        }
    }
`