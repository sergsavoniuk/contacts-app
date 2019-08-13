import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Link = styled(RouterLink)`
  color: #06c;
  text-decoration: none;

  &:hover {
    color: #09529a;
    text-decoration: underline;
  }
`;
