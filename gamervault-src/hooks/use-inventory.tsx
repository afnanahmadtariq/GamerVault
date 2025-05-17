"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface NFT {
  id: string;
  name: string;
  image: string;
  game: string;
  rarity: string;
  category: string;
  acquired: string;
  value?: number;
  description?: string;
}

interface InventoryStats {
  totalCount: number;
  totalValue: number;
  rarestItem: string;
  gameCount: number;
  rarityDistribution: Record<string, number>;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface InventoryFilters {
  game?: string;
  rarity?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useInventory() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const [filters, setFilters] = useState<InventoryFilters>({
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
      
      const response = await fetch(`/api/inventory?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }
      
      const data = await response.json();
      setNfts(data.nfts);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      toast({
        title: 'Error',
        description: 'Failed to load inventory',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update filters and reset to first page
  const updateFilters = (newFilters: Partial<InventoryFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Change page
  const changePage = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  // Fetch on mount and when filters or pagination change
  useEffect(() => {
    fetchNFTs();
  }, [filters, pagination.page, pagination.limit]);

  return {
    nfts,
    stats,
    pagination,
    filters,
    isLoading,
    updateFilters,
    changePage,
    refreshInventory: fetchNFTs
  };
}
