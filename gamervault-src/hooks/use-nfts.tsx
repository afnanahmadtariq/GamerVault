"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { apiGet } from "@/lib/api-client";

export interface NFT {
  id: string;
  name: string;
  image: string;
  game: string;
  rarity: string;
  category?: string;
  acquired?: string;
  price?: number;
  forSale: boolean;
  seller?: {
    id: string;
    name: string;
    image?: string;
  };
}

interface NFTStats {
  totalOwned: number;
  totalMarketplace: number;
  categories: {
    weapon: number;
    armor: number;
    mount: number;
    collectible: number;
    other: number;
  };
  rarities: {
    common: number;
    uncommon: number;
    rare: number;
    epic: number;
    legendary: number;
    mythic: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface NFTFilters {
  game?: string;
  rarity?: string;
  category?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useNFTs() {
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [marketplaceNFTs, setMarketplaceNFTs] = useState<NFT[]>([]);
  const [allNFTs, setAllNFTs] = useState<NFT[]>([]);
  const [stats, setStats] = useState<NFTStats | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [filters, setFilters] = useState<NFTFilters>({
    sortBy: 'acquiredDate',
    sortOrder: 'desc'
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  // Fetch NFTs with current filters and pagination
  const fetchNFTs = async () => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', String(pagination.page));
      params.append('limit', String(pagination.limit));
      
      if (filters.game) params.append('game', filters.game);
      if (filters.rarity) params.append('rarity', filters.rarity);
      if (filters.category) params.append('category', filters.category);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      
      // In a real implementation, we would fetch from the API using our api-client:
      // try {
      //   const data = await apiGet(`/api/nfts?${params.toString()}`);
      //   // No need to check for response.ok as apiGet handles that automatically
      //   // and will handle token invalidation if needed
      // } catch (error) {
      //   // apiGet will automatically handle 401 errors
      //   throw error;
      // }
      
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock data
      const mockOwnedNFTs: NFT[] = [
        {
          id: "nft-1",
          name: "Legendary Sword",
          image: "https://images.unsplash.com/photo-1601629657387-5df99902d615?w=800&h=800&fit=crop&q=80",
          game: "Epic Quest",
          rarity: "Legendary",
          category: "Weapon",
          acquired: "2023-05-15",
          forSale: false
        },
        {
          id: "nft-2",
          name: "Golden Shield",
          image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=800&fit=crop&q=80",
          game: "Epic Quest",
          rarity: "Epic",
          category: "Armor",
          acquired: "2023-06-22",
          forSale: false
        },
        {
          id: "nft-3",
          name: "Mystic Staff",
          image: "https://images.unsplash.com/photo-1549122728-f51970943692?w=800&h=800&fit=crop&q=80",
          game: "Wizard Wars",
          rarity: "Rare",
          category: "Weapon",
          acquired: "2023-07-10",
          forSale: false
        },
        {
          id: "nft-4",
          name: "Dragon Mount",
          image: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=800&fit=crop&q=80",
          game: "Dragon Riders",
          rarity: "Legendary",
          category: "Mount",
          acquired: "2023-08-05",
          forSale: false
        }
      ];
      
      const mockMarketplaceNFTs: NFT[] = [
        {
          id: "market-1",
          name: "Excalibur",
          image: "https://source.unsplash.com/aO-8_k3hQoY/300x300",
          game: "Epic Quest",
          rarity: "Mythic",
          category: "Weapon",
          price: 2500,
          forSale: true,
          seller: {
            id: "user-1",
            name: "GameMaster"
          }
        },
        {
          id: "market-2",
          name: "Phoenix Mount",
          image: "https://source.unsplash.com/iI9aY14x55A/300x300",
          game: "Dragon Riders",
          rarity: "Legendary",
          category: "Mount",
          price: 3000,
          forSale: true,
          seller: {
            id: "user-2",
            name: "DragonLord"
          }
        },
        {
          id: "market-3",
          name: "Stealth Armor",
          image: "https://source.unsplash.com/nApaSgkzaxg/300x300",
          game: "Shadow Assassin",
          rarity: "Epic",
          category: "Armor",
          price: 1200,
          forSale: true,
          seller: {
            id: "user-3",
            name: "ShadowMaster"
          }
        },
        {
          id: "market-4",
          name: "Wizard's Grimoire",
          image: "https://source.unsplash.com/a_PDPUPWnhQ/300x300",
          game: "Wizard Wars",
          rarity: "Legendary",
          category: "Collectible",
          price: 1800,
          forSale: true,
          seller: {
            id: "user-4",
            name: "Merlin"
          }
        }
      ];
      
      const mockStats: NFTStats = {
        totalOwned: mockOwnedNFTs.length,
        totalMarketplace: mockMarketplaceNFTs.length,
        categories: {
          weapon: 3,
          armor: 2,
          mount: 2,
          collectible: 1,
          other: 0
        },
        rarities: {
          common: 0,
          uncommon: 0,
          rare: 1,
          epic: 2,
          legendary: 4,
          mythic: 1
        }
      };
        // Apply search filter and other filters
      const search = filters.search?.toLowerCase();
      const filterBySearch = (nft: NFT) => {
        // If no search term, include all NFTs
        if (!search) return true;
        
        return (
          nft.name.toLowerCase().includes(search) ||
          nft.game.toLowerCase().includes(search) ||
          nft.category?.toLowerCase().includes(search) ||
          nft.rarity.toLowerCase().includes(search)
        );
      };
      
      // Filter the NFTs without modifying the original arrays
      const filteredOwnedNFTs = mockOwnedNFTs.filter(filterBySearch);
      const filteredMarketplaceNFTs = mockMarketplaceNFTs.filter(filterBySearch);
      
      setOwnedNFTs(filteredOwnedNFTs);
      setMarketplaceNFTs(filteredMarketplaceNFTs);
      setAllNFTs([...filteredOwnedNFTs, ...filteredMarketplaceNFTs]);
      setStats(mockStats);
      setPagination({
        page: 1,
        limit: 20,
        total: mockOwnedNFTs.length + mockMarketplaceNFTs.length,
        pages: 1
      });
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load NFTs',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update filters and reset to first page
  const updateFilters = (newFilters: Partial<NFTFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Change page
  const changePage = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };
  // Purchase NFT
  const purchaseNFT = async (nftId: string) => {
    try {
      // In a real implementation using our API client:
      // try {
      //   const result = await apiPost(`/api/marketplace/${nftId}/buy`);
      //   // apiPost will automatically handle auth errors and token invalidation
      // } catch (error) {
      //   // Handle specific errors from the API if needed
      //   throw error;
      // }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const nft = marketplaceNFTs.find(nft => nft.id === nftId);
      if (!nft) {
        throw new Error('NFT not found');
      }
      
      toast({
        title: 'Success',
        description: `You've successfully purchased ${nft.name}!`,
      });
      
      // Refresh listings
      fetchNFTs();
      
      return { success: true };
    } catch (error) {
      console.error('Error purchasing NFT:', error);
      toast({
        title: 'Purchase Failed',
        description: error instanceof Error ? error.message : 'Failed to purchase NFT',
        variant: 'destructive',
      });
      
      return { success: false, error };
    }
  };

  // Fetch on mount and when filters or pagination change
  useEffect(() => {
    fetchNFTs();
  }, [filters, pagination.page, pagination.limit]);

  return {
    ownedNFTs,
    marketplaceNFTs,
    allNFTs,
    stats,
    pagination,
    filters,
    isLoading,
    updateFilters,
    changePage,
    purchaseNFT,
    refreshNFTs: fetchNFTs
  };
}
