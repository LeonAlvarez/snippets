import React, { Fragment } from 'react';
import { connectAutoComplete, connectStateResults } from 'react-instantsearch/connectors';
import { Highlight, Pagination } from 'react-instantsearch/dom';
import Link from "gatsby-link";
import lodash from "lodash";
import {LayoutContext} from "../../layouts/layout-context";

const formatHits = (hits) => hits.map( hit => ({
    title: hit.frontmatter.title,
    category: hit.frontmatter.category,
    tags: hit.frontmatter.tags,
    slug: hit.frontmatter.slug,
    objectID: hit.objectID,
    _highlightResult: {
        title: hit._highlightResult.frontmatter.title,
        category: hit._highlightResult.frontmatter.category,
        tags: hit._highlightResult.frontmatter.tags,
        ...hit._highlightResult,
    }, 
}));

class AutoCompleteWithQueryMatching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: this.props.hits,
        };
    }
  
    componentWillReceiveProps(nextProps) {
      const { currentRefinement: nextRefinement, hits, searchResults } = nextProps;
      const { currentRefinement } = this.props;
  
      const hasMatchingResults =
        !!searchResults &&
        !!searchResults.query &&
        currentRefinement.startsWith(searchResults.query);
  
      this.setState({
        hits: hasMatchingResults && !!nextRefinement ? hits : [],
      });
    }
  
    render() {
      const { currentRefinement, refine } = this.props;
      const { hits } = this.state;
  
      return (
        <div>
          <AutoComplete
            hits={hits}
            currentRefinement={currentRefinement}
            refine={refine}
          />
          <Pagination className={hits.length < 1 ? 'hidden' : ''} />
        </div>
      );
    }
}
  
const AutoComplete = ({ hits, currentRefinement, refine }) => (
  <LayoutContext.Consumer>
    {({toggleSearch}) => (
      <Fragment>
        <input
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)}
          placeholder="Type to search a snippet"
        />
        {(
          <ul>
            {console.log(formatHits(hits))}
            {formatHits(hits).map(hit => (
              <li key={hit.objectID}>
                {console.log(hit)}
                <Link className="search-result my-2" to={`/${lodash.kebabCase(hit.slug)}`} onClick={toggleSearch}>
                  <Highlight attribute="title" hit={hit} />
                  <Highlight attribute="category" hit={hit} />
                  <Highlight attribute="tags" hit={hit} />
                </Link>   
              </li>
            ))}
          </ul>
         )}
      </Fragment>
        )}
  </LayoutContext.Consumer> 
);

const ConnectedWithQueryMatching = connectAutoComplete(connectStateResults(AutoCompleteWithQueryMatching));
export default ConnectedWithQueryMatching;