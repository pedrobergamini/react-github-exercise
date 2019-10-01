import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, SelectIssues, Footer } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    status: 'all',
    page: 1,
  };

  componentDidMount() {
    this.loadIssues();
  }

  async componentDidUpdate(_, prevState) {
    const { status, page } = this.state;

    if (prevState.status !== status) {
      this.loadIssues();
    }

    if (prevState.page !== page) {
      this.loadIssues();
    }
  }

  loadIssues = async () => {
    this.setState({ loading: true });

    const { match } = this.props;

    const { status, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?page=${page}`, {
        params: {
          state: status,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  };

  changeIssues = e => {
    this.setState({ status: e.target.value });
  };

  previousPage = () => {
    const { page } = this.state;

    this.setState({ page: page - 1 });
  };

  nextPage = () => {
    const { page } = this.state;

    this.setState({ page: page + 1 });
  };

  render() {
    const { repository, issues, loading, status, page } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
          <SelectIssues>
            <h3>Issues State</h3>
            <div>
              <div>
                <span>All</span>
                <input
                  type="radio"
                  name="status"
                  value="all"
                  onClick={this.changeIssues}
                  checked={status === 'all'}
                />
              </div>

              <div>
                <span>Open</span>
                <input
                  type="radio"
                  name="status"
                  value="open"
                  onClick={this.changeIssues}
                  checked={status === 'open'}
                />
              </div>

              <div>
                <span>Closed</span>
                <input
                  type="radio"
                  name="status"
                  value="closed"
                  onClick={this.changeIssues}
                  checked={status === 'closed'}
                />
              </div>
            </div>
          </SelectIssues>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Footer page={page}>
          {page > 1 && (
            <button type="button" onClick={this.previousPage}>
              Anterior
            </button>
          )}

          {issues.length > 0 && (
            <button type="button" onClick={this.nextPage}>
              Próxima
            </button>
          )}
        </Footer>
      </Container>
    );
  }
}
