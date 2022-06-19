import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Highlight,
  Pagination,
  Configure,
} from "react-instantsearch-hooks-web";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

const App = () => {
  const Post = ({ hit }) => {
    return (
      <article>
        <h1>
          <Highlight attribute="title" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="content" hit={hit} />
        </p>
      </article>
    );
  };

  return (
    <InstantSearch searchClient={searchClient} indexName="post">
      <SearchBox />
      <RefinementList attribute="UserId" />
      <Hits hitComponent={Post} />
      <Configure hitsPerPage={10} />
    </InstantSearch>
  );
};

export default App;
