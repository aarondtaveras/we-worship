import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Slide,
    Divider,
    Modal,
    List,
    ListItem
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

const DisplayTable = ({ type, data }) => {
    const [currentSong, setSong] = useState({});
    const [open, setOpen] = useState(false);
    const COLUMNS = type === 'song' ? 
        ['Title', 'Key', 'Author', 'Original Key', 'Vocalist', ''] : 
        ['Name', 'Total Tracks', '']
    ;

    const handleOpen = (song) => {
        setSong(song);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (song) => {
        console.log('delete clicked');
    };

    const handleEdit = () => {
        console.log('edit clicked');
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const TableHeads = () => {
        const component = (
            <TableHead>
                <TableRow>
                    {COLUMNS.map((c, key)=> {
                        return (
                            <TableCell className={`${key > 0 && 'mobile-hide'}`} key={key} align="right"><b>{c}</b></TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
        
        return component;
    }

    const Rows = (data) => {
        let parsed = [];
        if (type === 'song') {
            parsed = data.map((d, key) => {
                return (
                    <TableRow className="table-row" onClick={()=> {handleOpen(d)}} key={key}>
                        <TableCell align="right">{d.title}</TableCell>
                        <TableCell className="mobile-hide" align="right">{d.originalAuthor}</TableCell>
                        <TableCell className="mobile-hide" align="right">{d.userKey}</TableCell>
                        <TableCell className="mobile-hide" align="right">{d.originalKey}</TableCell>
                        <TableCell className="mobile-hide" align="right">{d.vocalist}</TableCell>
                        <TableCell className="delete-btn" align="right">
                            <Delete onClick={handleDelete} style={{cursor: 'pointer'}}/>
                        </TableCell>
                    </TableRow>
                );
            });
        }

        return parsed;
    };

    return (
        <Fragment>
            <TableContainer className="" style={{ margin: '12px 0px', fontFamily: 'Alata' }} component={Paper}>
                <Table className={`${type}-table`}>
                    {TableHeads()}
                    <TableBody>
                        {Rows(data)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal TransitionComponent={Transition} open={open} onClose={handleClose} aria-labelledby="more-song-info">
                <div className="modal">
                    <h4>
                        <b>{`Title: ${currentSong.title}`}</b>
                        <Edit style={{float: 'right', cursor: 'pointer'}}/>
                    </h4>
                    <Divider/>
                    <List>
                        {Object.keys(currentSong).map((key)=> {
                            return (key!=='title' && key !=='_id' && key!=='__v') ? <ListItem>{`${key}: ${currentSong[key]}`}</ListItem> : null;
                        })}
                    </List>
                </div>
            </Modal>
        </Fragment>
    );
}

DisplayTable.propTypes = {
    type: PropTypes.string,
    data: PropTypes.array
};

DisplayTable.defaultProps = {
    type: 'song',
    data: []
};

export default DisplayTable;