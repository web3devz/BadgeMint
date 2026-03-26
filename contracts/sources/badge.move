module badge_mint::badge {
    use std::string::{Self, String};
    use one::event;

    /// NFT badge owned by recipient
    public struct Badge has key, store {
        id: object::UID,
        name: String,
        description: String,
        image_url: String,
        issuer: address,
        recipient: address,
        epoch: u64,
    }

    public struct BadgeMinted has copy, drop {
        name: String,
        issuer: address,
        recipient: address,
        epoch: u64,
    }

    const E_EMPTY_NAME: u64 = 0;

    /// Mint a badge NFT to any recipient
    public fun mint(
        raw_name: vector<u8>,
        raw_description: vector<u8>,
        raw_image_url: vector<u8>,
        recipient: address,
        ctx: &mut TxContext,
    ) {
        let name = string::utf8(raw_name);
        assert!(string::length(&name) > 0, E_EMPTY_NAME);

        let issuer = ctx.sender();
        let epoch = ctx.epoch();

        event::emit(BadgeMinted { name, issuer, recipient, epoch });

        let badge = Badge {
            id: object::new(ctx),
            name,
            description: string::utf8(raw_description),
            image_url: string::utf8(raw_image_url),
            issuer,
            recipient,
            epoch,
        };
        transfer::transfer(badge, recipient);
    }

    /// Burn a badge (owner only)
    public fun burn(badge: Badge, ctx: &TxContext) {
        assert!(badge.recipient == ctx.sender(), 0);
        let Badge { id, name: _, description: _, image_url: _, issuer: _, recipient: _, epoch: _ } = badge;
        object::delete(id);
    }

    public fun name(b: &Badge): &String { &b.name }
    public fun issuer(b: &Badge): address { b.issuer }
    public fun recipient(b: &Badge): address { b.recipient }
}
