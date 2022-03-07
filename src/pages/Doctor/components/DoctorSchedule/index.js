/* eslint-disable array-callback-return */
import React from 'react';
import { Card } from 'react-bootstrap';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DoctorScheduleCreate from './components/createSchedule';
import DoctorScheduleUpdate from './components/updateSchedule';
import DoctorScheduleDetail from './components/detailSchedule';

export default function DoctorSchedule() {
  const match = useRouteMatch();
  return (
    <div className="container">
      <Card className="p-4">
        <Switch>
          <Route path={match.url} exact component={DoctorScheduleDetail} />
          <Route path={`${match.url}/create`} component={DoctorScheduleCreate} />
          <Route path={`${match.url}/update`} component={DoctorScheduleUpdate} />
        </Switch>{' '}
      </Card>
    </div>
  );
}
