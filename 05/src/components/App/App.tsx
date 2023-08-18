import React, { memo } from 'react';
import { LinkInput } from '../common/LinkInput/LinkInput';
import { Navigation } from '../common/Navigation/Navigation';

import './App.scss';
import { KanbanBoard } from '../common/KanbanBoard/KanbanBoard';
import { useAppSelector } from '../../app/hooks';
import { useGetIssuesByRepoQuery } from '../../services/repository';
import { Alert } from '@mui/material';

export const App: React.FC = memo(() => {
  const { link } = useAppSelector((state) => state.repositoryLink);

  const { isError } = useGetIssuesByRepoQuery(link);

  return (
    <div className="App">
      {isError && link.length > 0 && (
        <Alert severity="error">Something went wrong</Alert>
      )}
      <LinkInput />
      <Navigation />
      <KanbanBoard />
    </div>
  );
});
