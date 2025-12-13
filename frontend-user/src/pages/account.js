// frontend-user/src/pages/account.js

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

import AccountLayout from "@/components/layout/AccountLayout";
import AccountSidebar from "@/components/account-hub/AccountSidebar";

import ProfileInformation from "@/components/account-hub/ProfileInformation";
import AddressManager from "@/components/account-hub/AddressManager";
import Notifications from "@/components/account-hub/Notifications";
import WishlistContainer from "@/components/wishlist/WishlistContainer";
import OrderContainer from "@/components/account-hub/orders/OrderContainer";
import Support from "@/components/account-hub/Support";
import Terms from "@/components/account-hub/Terms";

export default function AccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, isLoading } = useAuth();

  const [activeView, setActiveView] = useState("profile");

  /* READ "?view=" FROM URL */
  useEffect(() => {
    const view = searchParams.get("view");
    if (view) setActiveView(view);
  }, [searchParams]);

  /* AUTH PROTECTION */
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-[12px] sm:text-base">
        Checking account...
      </div>
    );

  if (!isLoggedIn) return null;

  return (
    <AccountLayout>
      {/* MAIN CONTAINER */}
      <div className="container mx-auto px-[4px] sm:px-6 lg:px-8 py-2 sm:py-8">

        {/* FLEX LAYOUT */}
        <div className="flex flex-row items-start gap-2 sm:gap-6 md:gap-8 min-h-[80vh]">

          {/* SIDEBAR — 30% on mobile, then 25%, then fixed */}
          <div className="w-[29%] sm:w-[26%] md:w-1/4 flex-shrink-0 min-w-[100px]">
            <AccountSidebar activeView={activeView} setActiveView={setActiveView} />
          </div>

          {/* CONTENT WRAPPER */}
          <div className="flex-1 min-w-0">

            {/* RESPONSIVE TEXT SCALING */}
            <div className="text-[10px] sm:text-[14px] md:text-base">

              {activeView === "profile" && <ProfileInformation />}

              {activeView === "addresses" && <AddressManager />}

              {activeView === "orders" && <OrderContainer />}

              {activeView === "notifications" && <Notifications />}

              {activeView === "wishlist" && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <WishlistContainer />
                </div>
              )}

              {activeView === "support" && <Support />}

              {activeView === "terms" && <Terms />}

            </div>
          </div>
        </div>

      </div>
    </AccountLayout>
  );
}
