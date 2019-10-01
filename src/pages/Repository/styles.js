import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  opacity: 0.8;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      height: 36px;
      width: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const SelectIssues = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  padding: 15px 30px;

  h3 {
    color: #7159c1;
    padding-bottom: 15px;
  }

  div {
    display: flex;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 15px;

      span {
        display: flex;
        color: #666;
        font-size: 10px;
        margin-right: 10px;
      }

      input {
        display: flex;
        align-items: center;
        justify-content: center;

        & + input {
          margin-left: 10px;
        }
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.page < 2 ? 'flex-end' : 'space-between')};
  margin-top: 30px;

  button {
    background: #7159c1;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    height: 36px;
    border: 0;
    padding: 0 20px;
    border-radius: 16px;
  }
`;
