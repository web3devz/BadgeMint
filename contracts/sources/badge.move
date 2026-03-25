module badge_mint::badge {
    use sui::event;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public struct Badge has key, store {
        id: UID,
        name: vector<u8>,
        description: vector<u8>,
        metadata_uri: vector<u8>,
        issuer: address,
        recipient: address,
    }

    public struct BadgeMinted has copy, drop {
        badge_id: UID,
        issuer: address,
        recipient: address,
    }

    /// Mints a badge NFT to the recipient.
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        metadata_uri: vector<u8>,
        recipient: address,
        ctx: &mut TxContext,
    ) {
        let issuer = tx_context::sender(ctx);
        let badge = Badge {
            id: object::new(ctx),
            name,
            description,
            metadata_uri,
            issuer,
            recipient,
        };
        event::emit(BadgeMinted { badge_id: badge.id, issuer, recipient });
        transfer::transfer(badge, recipient);
    }
}
