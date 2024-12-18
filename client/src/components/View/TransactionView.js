/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FontAwesome from 'react-fontawesome';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Table, Card, CardBody, CardTitle } from 'reactstrap';
import JSONTree from 'react-json-tree';
import { transactionType } from '../types';
import Modal from '../Styled/Modal';
/* eslint-disable */
const readTheme = {
	base00: '#f3f3f3',
	base01: '#2e2f30',
	base02: '#515253',
	base03: '#737475',
	base04: '#959697',
	base05: '#b7b8b9',
	base06: '#dadbdc',
	base07: '#fcfdfe',
	base08: '#e31a1c',
	base09: '#e6550d',
	base0A: '#dca060',
	base0B: '#31a354',
	base0C: '#80b1d3',
	base0D: '#3182bd',
	base0E: '#756bb1',
	base0F: '#b15928'
};
const writeTheme = {
	base00: '#ffffff',
	base01: '#2e2f30',
	base02: '#515253',
	base03: '#737475',
	base04: '#959697',
	base05: '#b7b8b9',
	base06: '#dadbdc',
	base07: '#fcfdfe',
	base08: '#e31a1c',
	base09: '#e6550d',
	base0A: '#dca060',
	base0B: '#31a354',
	base0C: '#80b1d3',
	base0D: '#3182bd',
	base0E: '#756bb1',
	base0F: '#b15928'
};
/* eslint-enable */
const styles = theme => ({
	listIcon: {
		color: '#ffffff',
		marginRight: 20
	},
	JSONtree: {
		'& ul': {
			backgroundColor: 'transparent !important',
			color: '#fff'
		}
	},
	readset_null: {
		display: 'none'
	},
	toggleContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between', // This ensures the title and toggle are on opposite ends
		width: '100%', // Ensures the container fills the CardBody
		marginBottom: '15px' // Adds some space between the toggle and the table
	},
	viewHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	viewLabel: {
		marginLeft: '10px', // Add some space between the label and the icon
	},
	toggleSwitch: {
		display: 'flex',
		alignItems: 'center',
	},
	toggleIcon: {
		// Styles for the toggle icon
		marginLeft: '10px', // Add some space between the label and the icon
		marginLeft: '10px', // Add some space between the label and the icon
		cursor: 'pointer', // Change the cursor to pointer when hovering over the icon
	}, 
	simplifiedViewContainer: {
	 display: 'flex',
	 flexDirection: 'column',
	 padding: '20px', // Adjust to match your design
	 gap: '10px', // Space between rows
 },
 topInfo: {
	 display: 'flex',
	 justifyContent: 'space-between',
 },
 midInfo: {
	 display: 'flex',
	 justifyContent: 'space-between',
 },
 bottomInfo: {
	 display: 'flex',
	 justifyContent: 'space-between',
 },
 infoBox: {
    flex: '1',
    padding: '10px',
    background: '#f4f4f4',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '4px',
    wordWrap: 'break-word',
    overflow: 'hidden',
    margin: '0 10px', // Adds horizontal margin
    '&:first-child': {
      marginLeft: '0', // Removes left margin for the first box
    },
    '&:last-child': {
      marginRight: '0', // Removes right margin for the last box
    },
  },
 // Styles for text that may need truncation
 truncatedText: {
	 whiteSpace: 'nowrap', // Keeps the text on a single line
	 overflow: 'hidden', // Hides any content that overflows the box
	 textOverflow: 'ellipsis', // Adds an ellipsis to any text that overflows
	 maxWidth: '100%', // Ensures the text doesn't exceed the width of its container
 },
 time: {
	 fontWeight: 'bold', // Makes the time bold
 },
 label: {
	 fontWeight: 'bold',
 },
 valid: {
	 backgroundColor: 'green',
	 color: 'white'
 },
 invalid: {
	 backgroundColor: 'red',
	 color: 'white'
 },
 bottomDataLayer: {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'start', 
	padding: '0 0', // Add padding at the top and bottom for spacing
 }, 
 dropdownContainer: {
	display: 'flex',
	alignItems: 'center',
	padding: '10px',
	backgroundColor: '#f4f4f4',
	borderRadius: '4px',
	marginBottom: '10px',
	border: '1px solid #ccc',
	},
	dropdownLabel: {
		flexGrow: 0, // Ensure the label does not grow
		flexBasis: '160px', // Set a fixed width for labels
		textAlign: 'right', // Right-align text to make it closer to the dropdown
		marginRight: '20px', // Increase right margin for better spacing
		fontWeight: 'bold',
	},
	customSelect: {
		flexGrow: 1,
		width: 'calc(100% - 180px)', // Adjust the width to fill remaining space
		padding: '8px',
		border: '1px solid #ccc',
	},
	setDetailsContainer: {
		display: 'flex',
		flexDirection: 'column',
		padding: '10px',
		backgroundColor: '#f4f4f4',
		borderRadius: '4px',
		margin: '10px 0', // Adds vertical margin
		border: '1px solid #ccc',
	},
	detailItem: {
		display: 'flex',
		justifyContent: 'space-between',
		borderBottom: '1px solid #ccc',
		padding: '5px 0',
	},
	detailKey: {
			fontWeight: 'bold',
			marginRight: '10px', // Right margin for spacing between key and value
	},
	detailValue: {
    marginLeft: '10px', // Left margin to indent the value
    textAlign: 'right', // Right-align the value
    flexGrow: 1,
    whiteSpace: 'normal', // Allows the text to wrap to the next line
    overflow: 'hidden', // Hides any content that overflows the box's content area
    textOverflow: 'ellipsis', // Adds an ellipsis to truncated text
    wordWrap: 'break-word', // Ensures words break to prevent overflow
    maxWidth: '70%', // Sets a max-width to balance between key and value
	},
	reads: {
    display: 'flex', // Sets up a flex container
    flexDirection: 'column', // Stacks child elements vertically
    flex: '1 1 50%', // Allows the container to grow to fill available space
    maxWidth: '50%', // Base size of the element before remaining space is distributed
    maxHeight: 'fit-content', // Limits the height to the content of the elements
	},
	writes: {
    display: 'flex', // Sets up a flex container
    flexDirection: 'column', // Stacks child elements vertically
    flex: '1 1 50%', // Allows the container to grow to fill available space
    maxWidth: '50%', // Base size of the element before remaining space is distributed
    maxHeight: 'fit-content', // Limits the height to the content of the elements
	},
	jsonTable: {
    width: '100%', // Full width to use all available space
    borderCollapse: 'collapse', // Collapses the border
    marginTop: '10px', // Adds space above the table
    marginBottom: '10px', // Adds space below the table
	},
	tableKey: {
			padding: '8px', // Padding around text
			borderRight: '1px solid #ddd', // Only right border for separation
			textAlign: 'left', // Align text to the left
			fontWeight: 'bold', // Make key bold
			backgroundColor: '#f4f4f4', // Light grey background for keys
			minWidth: '30%', // Minimum width
	},

	tableValue: {
			padding: '8px', // Padding around text
			borderLeft: '1px solid #ddd', // Only left border for separation
			textAlign: 'right', // Align values to the right
			flexGrow: 1, // Allows the cell to grow and fill available space
			whiteSpace: 'normal', // Allows the text to wrap to the next line
			wordWrap: 'break-word', // Ensures words break to prevent overflow
			maxWidth: '70%', // Sets a max-width to balance between key and value
	},
	detailItem: {
			display: 'flex',
			justifyContent: 'space-between',
			padding: '5px 0',
	},
	summaryContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two columns
    gridTemplateRows: 'auto 1fr', // Auto row for the title, 1fr for content
    gridTemplateAreas: `
        'title title'
        'key value'
    `,
    gridGap: '10px', // Space between items
    padding: '20px 20px', // Uniform padding on all sides
    backgroundColor: '#f4f4f4',
    borderRadius: '4px',
    border: '1px solid #ccc',
    margin: '20px 0', // Uniform margin above and below the box
	},
	summaryTitle: {
			gridArea: 'title',
			textAlign: 'center', // Center-aligns the title text
			fontWeight: 'bold', // Make the font bold
			fontSize: '18px', // Adjust font size as needed
			color: '#333', // Darker text color for better readability
			marginBottom: '20px', // Adds space below the title
	},
	summaryKey: {
			gridArea: 'key',
			padding: '8px', // Padding around text
			textAlign: 'left', // Align text to the left
			fontWeight: 'bold', // Make key bold
			backgroundColor: '#e8e8e8', // Light grey background for keys
			border: '1px solid #ccc', // Border for separation
	},
	summaryValue: {
			gridArea: 'value',
			padding: '8px', // Padding around text
			textAlign: 'right', // Align values to the right
			backgroundColor: '#f9f9f9', // Slightly different background for values
			border: '1px solid #ccc', // Border for separation
	}
});

const reads = {
	color: '#2AA233'
};
const writes = {
	color: '#DD8016'
};

export class TransactionView extends Component {
	state = {
    isSimplifiedView: true, // Tracks which view is active
		selectedReadChaincode: '',
		selectedWriteChaincode: '',
		selectedReadSets: [],
		selectedWriteSets: [],
		selectedReadSetData: null, // Initialize to null
		selectedWriteSetData: null, // Initialize to null
		readSetsForAllChaincodes: [],
		writeSetsForAllChaincodes: [],
  };

  // Toggle between simplified and technical view
  toggleView = () => {
    this.setState(prevState => ({
      isSimplifiedView: !prevState.isSimplifiedView,
    }));
  };

	componentDidMount() {
    this.initializeSetMappings();
	}

	componentDidUpdate(prevProps) {
			if (prevProps.transaction !== this.props.transaction) {
					this.initializeSetMappings();
			}
	}

	initializeSetMappings = () => {
    const readSetsMapping = this.getChaincodeReadSetsMapping(this.props.transaction);
    const writeSetsMapping = this.getChaincodeWriteSetsMapping(this.props.transaction);

    const readChaincodes = Object.keys(readSetsMapping);
    const writeChaincodes = Object.keys(writeSetsMapping);

    // Select the second chaincode if available, otherwise the first one
    const firstReadChaincode = readChaincodes.length > 1 ? readChaincodes[1] : readChaincodes[0] || '';
    const firstWriteChaincode = writeChaincodes.length > 1 ? writeChaincodes[1] : writeChaincodes[0] || '';

    this.setState({
        readSetsForAllChaincodes: readSetsMapping,
        writeSetsForAllChaincodes: writeSetsMapping,
        selectedReadChaincode: firstReadChaincode,
        selectedWriteChaincode: firstWriteChaincode,
        selectedReadSets: readSetsMapping[firstReadChaincode] || [],
        selectedWriteSets: writeSetsMapping[firstWriteChaincode] || [],
        selectedReadSetData: readSetsMapping[firstReadChaincode] && readSetsMapping[firstReadChaincode].length > 0 ? readSetsMapping[firstReadChaincode][0] : null,
        selectedWriteSetData: writeSetsMapping[firstWriteChaincode] && writeSetsMapping[firstWriteChaincode].length > 0 ? writeSetsMapping[firstWriteChaincode][0] : null,
    });
	};

	handleClose = () => {
		const { onClose } = this.props;
		onClose();
	};

	handleReadChaincodeSelect = (e) => {
    const selectedChaincode = e.target.value;
    const sets = this.state.readSetsForAllChaincodes[selectedChaincode] || [];
    this.setState({
        selectedReadChaincode: selectedChaincode,
        selectedReadSets: sets,
        selectedReadSetData: sets.length > 0 ? sets[0] : null, // Automatically select the first set
    });
	};

	handleWriteChaincodeSelect = (e) => {
			const selectedChaincode = e.target.value;
			const sets = this.state.writeSetsForAllChaincodes[selectedChaincode] || [];
			this.setState({
					selectedWriteChaincode: selectedChaincode,
					selectedWriteSets: sets,
					selectedWriteSetData: sets.length > 0 ? sets[0] : null, // Automatically select the first set
			});
	};

	handleSetSelect = (type, event) => {
		const selectedIndex = parseInt(event.target.value, 10);
		const selectedSetData = this.state[`selected${type}Sets`][selectedIndex] || null;
		console.log(`Selected ${type} set:`, selectedSetData); // Debug log
		this.setState({
				[`selected${type}SetData`]: selectedSetData,
		});
	};

	renderTechnicalView(transaction, classes, modalClasses) {
		let directLink = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/?tab=transactions&transId=' + transaction.txhash;
		
		return (
			<CardBody className={modalClasses.body}>
				<Table striped hover responsive className="table-striped">
					<tbody>
						<tr>
							<th>Transaction ID:</th>
							<td>
								{transaction.txhash}
								<button type="button" className={modalClasses.copyBtn}>
									<div className={modalClasses.copy}>Copy</div>
									<div className={modalClasses.copied}>Copied</div>
									<CopyToClipboard text={transaction.txhash}>
										<FontAwesome name="copy" />
									</CopyToClipboard>
								</button>
							</td>
						</tr>
						<tr>
							<th>Validation Code:</th>
							<td>{transaction.validation_code}</td>
						</tr>
						<tr>
							<th>Payload Proposal Hash:</th>
							<td>{transaction.payload_proposal_hash}</td>
						</tr>
						<tr>
							<th>Creator MSP:</th>
							<td>Jio Streams</td>
						</tr>
						<tr>
							<th>Endorser:</th>
							<td>{transaction.endorser_msp_id}</td>
						</tr>
						<tr>
							<th>Chaincode Name:</th>
							<td>{transaction.chaincodename}</td>
						</tr>
						<tr>
							<th>Type:</th>
							<td>{transaction.type}</td>
						</tr>
						<tr>
							<th>Time:</th>
							<td>{transaction.createdt}</td>
						</tr>
						<tr>
							<th>Direct Link:</th>
							<td>
								{directLink}
								<button type="button" className={modalClasses.copyBtn}>
									<div className={modalClasses.copy}>Copy</div>
									<div className={modalClasses.copied}>Copied</div>
									<CopyToClipboard text={directLink}>
										<FontAwesome name="copy" />
									</CopyToClipboard>
								</button>
							</td>
						</tr>
						<tr className={!transaction.read_set && classes.readset_null}>
							<th style={reads}>Reads:</th>
							<td className={classes.JSONtree}>
								<JSONTree
									data={transaction.read_set}
									theme={readTheme}
									invertTheme={false}
								/>
							</td>
						</tr>
						<tr className={!transaction.read_set && classes.readset_null}>
							<th style={writes}>Writes:</th>
							<td className={classes.JSONtree}>
								<JSONTree
									data={transaction.write_set}
									theme={writeTheme}
									invertTheme={false}
								/>
							</td>
						</tr>
					</tbody>
				</Table>
			</CardBody>
		);
	}
	
	
	getChaincodeReadSetsMapping = (transaction) => {
    const { read_set } = transaction;
    let mapping = {};

    // Assume combining read_set and write_set is required
    [...read_set].forEach(item => {
        if (!mapping[item.chaincode]) {
            mapping[item.chaincode] = [];
        }
        mapping[item.chaincode].push(...item.set);
    });

    return mapping;
	}

	getChaincodeWriteSetsMapping = (transaction) => {
    const { write_set } = transaction;
    let mapping = {};

    // Assume combining read_set and write_set is required
    [...write_set].forEach(item => {
        if (!mapping[item.chaincode]) {
            mapping[item.chaincode] = [];
        }
        mapping[item.chaincode].push(...item.set);
    });

    return mapping;
	}

	renderReadsSetsDropdown = (classes) => {
    const { selectedReadSets } = this.state;
    return (
				<div className={classes.dropdownContainer}>
					<label className={classes.dropdownLabel} htmlFor="readSetsDropdown">Select Set:</label>
					<select id="readSetsDropdown" className={classes.customSelect} onChange={(e) => this.handleSetSelect('Read', e)}>
							{selectedReadSets.length > 0 ? selectedReadSets.map((_, index) => (
									<option key={index} value={index}>Set {index + 1}</option>
							)) : <option>No sets found.</option>}
					</select>
        </div>
    );
	};

	renderWritesSetsDropdown = (classes) => {
    const { selectedWriteSets } = this.state;
    return (
				<div className={classes.dropdownContainer}>
					<label className={classes.dropdownLabel} htmlFor="writeSetsDropdown">Select Set:</label>
					<select id="writeSetsDropdown" className={classes.customSelect} onChange={(e) => this.handleSetSelect('Write', e)}>
							{selectedWriteSets.length > 0 ? selectedWriteSets.map((_, index) => (
									<option key={index} value={index}>Set {index + 1}</option>
							)) : <option>No sets found.</option>}
					</select>
        </div>
    );
	};

	renderChaincodeDropdown = (type, classes) => {
    const property = `${type.toLowerCase()}SetsForAllChaincodes`;
    const selectedType = `selected${type}Chaincode`;
    return (
				<div className={classes.dropdownContainer}>
					<label htmlFor={`${type.toLowerCase()}ChaincodeDropdown`} className={classes.dropdownLabel}>Select Chaincode:</label>
						<select id={`${type.toLowerCase()}ChaincodeDropdown`} onChange={this[`handle${type}ChaincodeSelect`]} value={this.state[selectedType]} className={`${classes.customSelect} custom-select`}>
                {Object.keys(this.state[property]).map((chaincode, index) => (
                    <option key={index} value={chaincode}>
                        {chaincode}
                    </option>
                ))}
            </select>
        </div>
    );
	};

	renderSummarySection = (classes) => {
    const { writeSetsForAllChaincodes } = this.state;
    let summaryData = {};

    // Loop through all chaincodes to find keys that match the criteria
    for (const sets of Object.values(writeSetsForAllChaincodes)) {
        for (const set of sets) {
            const keyValue = set['key'];
            if (keyValue && typeof keyValue === 'string' && /^BidMatch_\d+$/.test(keyValue)) {
                const valueValue = JSON.parse(set['value']);
                summaryData = {
                    bidUnitPrice: valueValue.bidUnitPrice,
                    deliveredBidUnits: valueValue.deliveredBidUnits,
                    buyerUserId: valueValue.buyerUserId,
                    sellerUserId: valueValue.sellerUserId,
                };
                break; // Break after finding the first match
            }
        }
        if (Object.keys(summaryData).length > 0) break; // Exit if data is found
    }

    if (Object.keys(summaryData).length === 0) {
        console.log("No BidMatch data found, not rendering summary section.");
        return null;
    }

    // Render the summary section with data in a 2x2 grid
    const entries = Object.entries(summaryData).slice(0, 4); // Limit to the first four entries
    return (
        <div className={classes.summaryContainer}>
            <h3 className={classes.summaryTitle}>Summary</h3>
            {entries.map(([key, val], index) => (
                <div key={index} style={{ gridColumn: index % 2 === 0 ? '1' : '2' }}>
                    <div className={classes.summaryKey}>{key}</div>
                    <div className={classes.summaryValue}>{val}</div>
                </div>
            ))}
        </div>
    );
	};
	
	renderSetDetails = (selectedSetData, classes) => {
    if (!selectedSetData) {
        return <div className={classes.infoBox}>No details available.</div>;
    }

    const isJson = (item) => {
			if (typeof item === "string") {
					try {
							item = JSON.parse(item);
					} catch (e) {
							return false;
					}
			}
			return (typeof item === "object" && item !== null);
		};
		
		const renderDetailValue = (value) => {
			if (isJson(value)) {
					const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
					return (
							<table className={classes.jsonTable}>
									<tbody>
											{Object.entries(parsedValue).map(([key, val], idx) => (
													<tr key={idx}>
															<td className={classes.tableKey}>{key}</td>
															<td className={classes.tableValue}>{typeof val === 'object' ? JSON.stringify(val) : val.toString()}</td>
													</tr>
											))}
									</tbody>
							</table>
					);
			}
			return <span className={classes.detailValue}>{typeof value === 'string' ? value : JSON.stringify(value)}</span>;
		};

		return (
				<div className={classes.setDetailsContainer}>
						{Object.keys(selectedSetData).map((key, index) => {
								// Assuming selectedSetData[key] might already be in correct JSON format or as a stringified JSON
								const detailValue = selectedSetData[key];
								console.log(`Processing key: ${key}, value: ${detailValue}`);
								return (
										<div key={index} className={classes.detailItem}>
												<strong className={classes.detailKey}>{key}:</strong>
												{renderDetailValue(detailValue)}
										</div>
								);
						})}
				</div>
		);
	};

	renderSimplifiedView(transaction, classes, modalClasses) {
		let directLink = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/?tab=transactions&transId=' + transaction.txhash;

		// Helper function to get the validation class
		const getValidationClass = (validationCode) => {
			return validationCode === 'VALID' ? classes.valid : classes.invalid;
		};
		
		return (
			<CardBody className={modalClasses.body}>
				<div className={classes.simplifiedViewContainer}>
					<div className={classes.topInfo}>
						<div className={`${classes.infoBox} ${classes.time}`}>
							<span className={classes.label}>Time:</span>
							<span>{transaction.createdt}</span>
						</div>
						<div className={`${classes.infoBox} ${getValidationClass(transaction.validation_code)}`}>
							<span className={classes.label}>Validation Code:</span>
							<span>{transaction.validation_code}</span>
						</div>
					</div>
					<div className={classes.midInfo}>
						<div className={`${classes.infoBox} ${classes.transactionId}`}>
							<span className={classes.label}>Transaction ID:</span>
							<button type="button" className={modalClasses.copyBtn}>
								<div className={modalClasses.copy}>Copy</div>
								<div className={modalClasses.copied}>Copied</div>
								<CopyToClipboard text={transaction.txhash}>
									<FontAwesome name="copy" />
								</CopyToClipboard>
							</button>
							<div className={`${classes.truncatedText}`}>{transaction.txhash}</div>
						</div>
						<div className={`${classes.infoBox} ${classes.directLink}`}>
							<span className={classes.label}>Direct Link:</span>
							<button type="button" className={modalClasses.copyBtn}>
								<div className={modalClasses.copy}>Copy</div>
								<div className={modalClasses.copied}>Copied</div>
								<CopyToClipboard text={directLink}>
									<FontAwesome name="copy" />
								</CopyToClipboard>
							</button>
							<div className={`${classes.truncatedText}`}>{directLink}</div>
						</div>
					</div>
					<div className={classes.bottomInfo}>
						<div className={`${classes.infoBox} ${classes.chaincodeName}`}>
							<span className={classes.label}>Chaincode Name:</span>
							{transaction.chaincodename}
						</div>
						<div className={`${classes.infoBox} ${classes.creatorMsp}`}>
							<span className={classes.label}>Creator MSP:</span>
							Creator MSP
						</div>
						<div className={`${classes.infoBox} ${classes.transactionType}`}>
							<span className={classes.label}>Transaction Type:</span>
							{transaction.type}
						</div>
					</div>
					<div>
						{this.renderSummarySection(classes)}
					</div>
					<div className={classes.bottomDataLayer}>
							<div className={`${classes.infoBox} ${classes.reads}`}>
									<span className={classes.label}>Reads:</span>
									{this.renderChaincodeDropdown('Read', classes)}
									{this.renderReadsSetsDropdown(classes)}
									{this.state.selectedReadSetData && this.renderSetDetails(this.state.selectedReadSetData, classes)}
							</div>
							<div className={`${classes.infoBox} ${classes.writes}`}>
									<span className={classes.label}>Writes:</span>
									{this.renderChaincodeDropdown('Write', classes)}
									{this.renderWritesSetsDropdown(classes)}
									{this.state.selectedWriteSetData && this.renderSetDetails(this.state.selectedWriteSetData, classes)}
							</div>
					</div>
				</div>
			</CardBody>
		);
	}
		
		render() {
			const { transaction, classes } = this.props;
			const { isSimplifiedView } = this.state; // Destructure state to get the current view
	
			if (transaction) {
				let toggleLabel = this.state.isSimplifiedView ? 'Switch to Technical View' : 'Switch to Simplified View';
				let viewLabel = this.state.isSimplifiedView ? 'Simplified View' : 'Technical View';
	
				return (
					<Modal>
						{modalClasses => (
							<div className={modalClasses.dialog}>
								<Card className={modalClasses.card}>
									<CardTitle className={modalClasses.title}>
										<FontAwesome name="list-alt" className={classes.listIcon} />
										Transaction Details
										<button
											type="button"
											onClick={this.handleClose}
											className={modalClasses.closeBtn}
										>
											<FontAwesome name="close" />
										</button>
									</CardTitle>
									<CardTitle className={`${modalClasses.title} ${classes.viewHeader}`}>
										<div className={classes.viewLabel}>
											<span>{viewLabel}</span>
										</div>
										<div className={classes.toggleSwitch}>
											<span>{toggleLabel}</span>
											<FontAwesome
												name={isSimplifiedView ? 'toggle-on' : 'toggle-off'}
												onClick={this.toggleView}
												className={classes.toggleIcon}
											/>
										</div>
									</CardTitle>
									<CardBody className={modalClasses.body}>
									<Card className={modalClasses.card}>
										{/* Add the header, toggle, etc., that are common to both views here */}
										{isSimplifiedView ? this.renderSimplifiedView(transaction, classes, modalClasses) : this.renderTechnicalView(transaction, classes, modalClasses)}
									</Card>
									</CardBody>
								</Card>
							</div>
						)}
					</Modal>
				);
			}
		return (
			<Modal>
				{modalClasses => (
					<div>
						<CardTitle className={modalClasses.title}>
							<FontAwesome name="list-alt" className={classes.listIcon} />
							Transaction Details
							<button
								type="button"
								onClick={this.handleClose}
								className={modalClasses.closeBtn}
							>
								<FontAwesome name="close" />
							</button>
						</CardTitle>
						<div align="center">
							<CardBody className={modalClasses.body}>
								<span>
									{' '}
									<FontAwesome name="circle-o-notch" size="3x" spin />
								</span>
							</CardBody>
						</div>
					</div>
				)}
			</Modal>
		);
	}
}

TransactionView.propTypes = {
	transaction: transactionType
};

TransactionView.defaultProps = {
	transaction: null
};

export default withStyles(styles)(TransactionView);
