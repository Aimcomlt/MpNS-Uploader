// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title MpNS – Minimal name ⇒ IPFS hash registry
contract MpNS {
    mapping(string => string) private records;

    event NameSet(string indexed name, string hash);

    /// @notice Map a human-readable name to an IPFS CID hash
    /// @param name Human-friendly identifier (e.g. `ai.docs.core1`)
    /// @param hash IPFS CID returned from an `add` call
    function setRecord(string calldata name, string calldata hash) external {
        records[name] = hash;
        emit NameSet(name, hash);
    }

    /// @notice Retrieve the IPFS hash for a stored name
    /// @param name Identifier to resolve
    /// @return The IPFS CID associated with the name
    function getRecord(string calldata name)
        external
        view
        returns (string memory)
    {
        return records[name];
    }
}
