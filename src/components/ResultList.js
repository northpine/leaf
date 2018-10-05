import React from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import {connect} from 'react-redux';

class ResultList extends React.Component {
  render() {
    const {results} = this.props;
    return (
      <Table>
        <TableBody>
          {results ? results.map((result => {
            return (
              <TableRow>
                <TableCell>
                  {result.properties.name}
                </TableCell>
                <TableCell>
                <a href={result.properties.url} target="_blank">{result.properties.url}</a>
                </TableCell>
              </TableRow>
            )
          }))
          : <p>Nothing loaded</p>}
        </TableBody>
      </Table>
    )
    
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    results: state.results.features
  }

}

const mapStateToDispatch = (dispatch, ownProps) => {

}


export default connect(mapStateToProps, mapStateToDispatch)(ResultList);