import React from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import {connect} from 'react-redux';
import TableHead from '@material-ui/core/TableHead';

const shortenUrl = (urlStr) => {
  const url = new URL(urlStr);
  return `${url.protocol}//${url.hostname}`;
}

class ResultList extends React.Component {
  render() {
    const {results} = this.props;
    if(results) {
      return (
        <Table>
          <TableHead>
            <TableCell>
              Layer Name
            </TableCell>
            <TableCell>
              URL
            </TableCell>
          </TableHead>
          <TableBody>
             {results.map((result => {
              const {name, url} = result.properties
              return (
                <TableRow>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    <a href={url} target="_blank">{shortenUrl(url)}</a>
                  </TableCell>
                </TableRow>
              )
            }))}
          </TableBody>
        </Table>
      )
    } else {
      return "Nothing loaded"
    }
    
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    results: state.results.features
  }

}

const mapStateToDispatch = (dispatch, ownProps) => {
  return {}
}


export default connect(mapStateToProps, mapStateToDispatch)(ResultList);