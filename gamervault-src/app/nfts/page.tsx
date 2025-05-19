"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search } from "lucide-react";
import { MainLayout } from "@/components/main-layout";
import { PageHeader } from "@/components/page-header";
import { NFTCard } from "@/components/nft-card";
import { MarketplaceNFT } from "@/components/marketplace-nft";
import { Badge } from "@/components/ui/badge";
import { useNFTs } from "@/hooks/use-nfts";

export default function NFTsPage() {
  const { 
    allNFTs, 
    ownedNFTs, 
    marketplaceNFTs, 
    stats, 
    filters, 
    isLoading, 
    updateFilters 
  } = useNFTs();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  const handleGameChange = (value: string) => {
    updateFilters({ game: value });
  };

  const handleRarityChange = (value: string) => {
    updateFilters({ rarity: value });
  };

  const handleCategoryChange = (value: string) => {
    updateFilters({ category: value });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    updateFilters({ 
      sortBy, 
      sortOrder: sortOrder as 'asc' | 'desc'
    });
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading NFTs...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader title="NFTs Collection" description="Browse all your NFTs and available marketplace items">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search NFTs..." 
              className="w-[200px] pl-8 md:w-[300px]" 
              value={filters.search || ""}
              onChange={handleSearch}
            />
          </div>
        </div>
      </PageHeader>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-auto">
              <Select 
                value={filters.game || "all"} 
                onValueChange={handleGameChange}
              >
                <SelectTrigger id="game-filter" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Games" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  <SelectItem value="epic quest">Epic Quest</SelectItem>
                  <SelectItem value="dragon riders">Dragon Riders</SelectItem>
                  <SelectItem value="wizard wars">Wizard Wars</SelectItem>
                  <SelectItem value="shadow assassin">Shadow Assassin</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.rarity || "all"}
                onValueChange={handleRarityChange}
              >
                <SelectTrigger id="rarity-filter" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Rarities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="uncommon">Uncommon</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                  <SelectItem value="mythic">Mythic</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.category || "all"}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category-filter" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="weapon">Weapons</SelectItem>
                  <SelectItem value="armor">Armor</SelectItem>
                  <SelectItem value="mount">Mounts</SelectItem>
                  <SelectItem value="collectible">Collectibles</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={`${filters.sortBy || 'acquiredDate'}-${filters.sortOrder || 'desc'}`}
                onValueChange={handleSortChange}
              >
                <SelectTrigger id="sort-by" className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acquiredDate-desc">Most Recent</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All NFTs</TabsTrigger>
          <TabsTrigger value="owned">My Collection</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">All NFTs ({allNFTs.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allNFTs.map((nft) => (
                <div key={nft.id} className="relative">
                  {nft.forSale ? (
                    <>
                      <Badge className="absolute top-2 left-2 z-10 bg-green-500">For Sale</Badge>
                      <MarketplaceNFT
                        id={nft.id}
                        name={nft.name}
                        image={nft.image}
                        game={nft.game}
                        category={nft.category || ""}
                        rarity={nft.rarity}
                        price={nft.price || 0}
                      />
                    </>
                  ) : (
                    <NFTCard
                      id={nft.id}
                      name={nft.name}
                      image={nft.image}
                      game={nft.game}
                      rarity={nft.rarity}
                      acquired={nft.acquired || "Unknown"}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="owned">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">My Collection ({ownedNFTs.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ownedNFTs.map((nft) => (
                <NFTCard
                  key={nft.id}
                  id={nft.id}
                  name={nft.name}
                  image={nft.image}
                  game={nft.game}
                  rarity={nft.rarity}
                  acquired={nft.acquired || "Unknown"}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="marketplace">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Marketplace Items ({marketplaceNFTs.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {marketplaceNFTs.map((nft) => (
                <div key={nft.id} className="relative">
                  <Badge className="absolute top-2 left-2 z-10 bg-green-500">For Sale</Badge>
                  <MarketplaceNFT
                    id={nft.id}
                    name={nft.name}
                    image={nft.image}
                    game={nft.game}
                    category={nft.category || ""}
                    rarity={nft.rarity}
                    price={nft.price || 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
