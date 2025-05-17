"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MarketplaceNFT {
  id: string;
  name: string;
  image: string;
  game: string;
  rarity: string;
  price: number;
  seller: {
    id: string;
    name: string;
    image?: string;
  };
}

interface MarketplaceStats {
  totalListings: number;
  priceStats: {
    min: number;
    max: number;
    avg: number;
  };
  gameDistribution: Record<string, number>;
  rarityDistribution: Record<string, number>;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface MarketplaceFilters {
  game?: string;
  rarity?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useMarketplace() {
  const [nfts, setNfts] = useState<MarketplaceNFT[]>([]);
  const [stats, setStats] = useState<MarketplaceStats | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'price',
    sortOrder: 'asc'
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch NFTs with current filters and pagination
  const fetchListings = async () => {
    try {
      setIsLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', String(pagination.page));
      params.append('limit', String(pagination.limit));
      
      if (filters.game) params.append('game', filters.game);
      if (filters.rarity) params.append('rarity', filters.rarity);
      if (filters.minPrice) params.append('minPrice', String(filters.minPrice));
      if (filters.maxPrice) params.append('maxPrice', String(filters.maxPrice));
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
      
      const response = await fetch(`/api/marketplace?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch marketplace listings');
      }
      
      const data = await response.json();
      setNfts(data.nfts);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching marketplace listings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load marketplace listings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update filters and reset to first page
  const updateFilters = (newFilters: Partial<MarketplaceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Change page
  const changePage = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Buy NFT
  const buyNFT = async (nftId: string) => {
    try {
      const response = await fetch(`/api/marketplace/${nftId}/buy`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to purchase NFT');
      }
      
      const result = await response.json();
      
      toast({
        title: 'Success',
        description: `You've successfully purchased ${result.nft.name}!`,
      });
      
      // Refresh listings
      fetchListings();
      
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
    fetchListings();
  }, [filters, pagination.page, pagination.limit]);

  return {
    nfts,
    stats,
    pagination,
    filters,
    isLoading,
    updateFilters,
    changePage,
    buyNFT,
    refreshMarketplace: fetchListings
  };
}
