# Builder Principles - Roadmap

## Current Features ✅
- Swipeable principle cards (44 principles from Jake)
- Share individual principles
- Tip the developer (USDC on Base)
- Deep linking to specific principles (/share/1, /share/2, etc.)
- Keyboard navigation (arrow keys)
- Tap navigation (left/right sides)
- Ultra-minimal glassmorphic design

## Future Features

### Principle Ownership Auction System
**Status**: Planned for future release

**Concept**:
- Users can bid to "own" a specific principle for 30 days
- Each principle can be owned by one user at a time
- Ownership grants:
  - Attribution on the principle card ("Owned by @username")
  - Special visual indicator/badge
  - Potential profile link or message
  - Exclusive shareable variant with owner attribution

**Technical Considerations**:
- Smart contract for bid management and ownership tracking
- NFT or on-chain registry for ownership records
- Time-based ownership expiration (30 days)
- Automatic re-auctioning of expired ownerships
- Bid history and leaderboard
- Revenue split (developer, Jake, community treasury)

**Design Questions**:
- Should owners be able to extend their ownership?
- What happens to bid funds? (treasury, burn, developer split)
- Should there be a minimum bid amount?
- Can users own multiple principles simultaneously?
- What visual indicators show ownership on cards?

**Dependencies**:
- Smart contract development (Solidity)
- Blockchain integration (likely Base network)
- Wallet signature requirements
- Backend for tracking ownership and bids
- UI for auction/bidding interface

---

**Note**: This is a living roadmap and priorities may shift based on community feedback and technical feasibility.
