const OptionStrategiesText = {

    "Long Call" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Long Call</span> is simply the purchase of a Call Option.</p>
            <p>
                This is a bullish strategy that will generate a profit at expiry in case
                the stock price increases and reaches a value higher than the Strike +
                Premium paid for the option (known as the break-even point).
            </p>
            <p>
                The option can also be sold before maturity, and in this case, the
                break-even point will be lower than at expiry.
            </p>
        </div>

    ),

    "Short Call" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Short Call</span> is a strategy that involves selling a Call Option and receiving a premium for it.</p>
            
            <p>The investor is hoping that the stock price will not rise, so that the option expires worthless, to keep the premium.</p>
            
            <p> This strategy is profitable at expiry in case the stock price does not exceed the break-even point (which is equal to the Strike + Premium received).</p>
        
            <p>It is important to note that this strategy has a limited profit, but unlimited potential loss, which makes it quite risky.</p>

        </div>

    ),

    "Long Put" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Long Put</span> is simply the purchase of a Put Option.</p>
            
            <p>This is a bearish strategy that generates a profit at expiry in case the stock price decreases to a value lower than the Strike minus the Premium (this is the break-even point of the strategy).</p>
            
        </div>

    ),

    "Short Put" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Short Put</span> is a strategy that involves selling a Put Option and receiving a premium.</p>
            
            <p>The seller of the option hopes that the stock price does not fall below the break-even point (equal to the Strike minus the Premium) on the expiry date, and in this case the strategy yields a profit.</p>

            <p>As with the <span style={{ fontWeight: "bold"}}>Short Call</span>, this strategy is quite risky, as it offers a limited profit, but a potentially huge loss in case the stock price drops to zero at expiry.</p>
            
        </div>
    ),
    "Bull Call Spread" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Bull Call Spread</span> is an options strategy involving the purchase of a <span style={{ fontWeight: "bold"}}>Call</span> with a lower strike and the selling of a <span style={{ fontWeight: "bold"}}>Call</span> with a higher strike.</p>
            
            <p>The motivation of the strategy is to generate a profit if the stock rises, but make the strategy cheaper than simply buying a call option.</p>

            <p>However, the Profit / Loss of a <span style={{ fontWeight: "bold"}}>Bull Call Spread</span> is limited (whereas the one of a plain call is unlimited).</p>
            
        </div>
    ),

    "Bear Put Spread" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Bear Put Spread</span> is an options strategy that involves the purchase of a <span style={{ fontWeight: "bold"}}>Put Option</span> with a higher strike and the selling of another <span style={{ fontWeight: "bold"}}>Put Option</span> with a lower strike.</p>
            
            <p>The sold put makes the strategy cheaper (compared to the purchase of a single put), while still allowing the investor to get a profit if the stock price decreases.</p>

            <p>The disadvantage of a <span style={{ fontWeight: "bold"}}>Bear Put Spread</span> (compared to a simple <span style={{ fontWeight: "bold"}}>Long Put</span> position) is that the P/L of the strategy is limited.</p>
            
        </div>
    ),

    "Long Straddle" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Long Straddle</span> is an options strategy involving the purchase of a <span style={{ fontWeight: "bold"}}>Call</span> and a <span style={{ fontWeight: "bold"}}>Put</span> option with the same strike.</p>
            
            <p>The strategy generates a profit if the stock price rises or drops considerably.</p>

        </div>
    ),

    "Short Straddle" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Short Straddle</span> is an options strategy involving the simultaneous selling of a <span style={{ fontWeight: "bold"}}>Call</span> and a <span style={{ fontWeight: "bold"}}>Put</span> with the same strike.</p>
            
            <p>The investor receives the premium from the sold options, and hopes that the stock price will end at the strike level (or not too far from it) on the expiry date.</p>

            <p>The profit of a <span style={{ fontWeight: "bold"}}>Short Straddle</span> is limited to the premium received, whereas its loss is unlimited.</p>

        </div>
    ),

    "Long Strangle" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Long Strangle</span> is an options strategy resembling the <span style={{ fontWeight: "bold"}}>Long Straddle</span>, the only difference being that the strike of the options are different: an investor is buying a <span style={{ fontWeight: "bold"}}>Call</span> with a higher strike and a <span style={{ fontWeight: "bold"}}>Put</span> with a lower strike.</p>
            
            <p>The strategy generates a profit in case the stock price rises or falls significantly by the expiry date.</p>

            <p>The <span style={{ fontWeight: "bold"}}>Strangle</span> is cheaper than the <span style={{ fontWeight: "bold"}}>Straddle</span>.</p>

        </div>
    ),

    "Short Strangle" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Short Strangle</span> is an options strategy similar to the <span style={{ fontWeight: "bold"}}>Short Straddle</span>, with one difference: the strikes of the sold options are different (you sell a <span style={{ fontWeight: "bold"}}>Call</span> with a higher strike and a <span style={{ fontWeight: "bold"}}>Put</span> with a lower strike)</p>
            
            <p>The strategy will generate a profit if the stock price stays between the two strikes by the expiry date.</p>

            <p>Compared to the <span style={{ fontWeight: "bold"}}>Short Straddle</span>, the <span style={{ fontWeight: "bold"}}>Short Stangle</span> has a lower profit, but higher probability of being profitable.</p>

        </div>
    ),

    "Long Butterfly" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Long Butterfly</span> is an options strategy that consists of options with 3 different strikes being sold and purchased at the same time.</p>
            
            <p>The strategy can be considered as an improved version of the <span style={{ fontWeight: "bold"}}>Short Straddle</span>, the improvement being that the maximum loss becomes limited and thus under full control.</p>

            <p>The <span style={{ fontWeight: "bold"}}>Long Butterfly</span> can be constructed in a number of ways (using only calls, using only puts, or using both), and the resulting strategies differ primarily in being either credit or debit ones.</p>

            <p>Below you can see an example of a debit <span style={{ fontWeight: "bold"}}>Long Butterfly</span> made of <span style={{ fontWeight: "bold"}}>Call</span> options.</p>

        </div>
    ),

    "Short Butterfly" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Short Butterfly</span> is an options strategy that can be considered as an improved version of a <span style={{ fontWeight: "bold"}}>Long Straddle</span>, the improvement being that the maximum loss becomes lower – unfortunately, at the expense of limiting the profit of the strategy.</p>
            
            <p>It is constructed using options with 3 different strikes.</p>

        </div>
    ),

    "Long Condor" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Long Condor</span> can be viewed as a variation of the <span style={{ fontWeight: "bold"}}>Long Butterfly</span> options strategy, the difference being that the strikes of the "wings" of the strategy are different.</p>
            
            <p>This widens the price range at which the strategy is profitable (and thus increases the probability of being profitable), but the maximum profit becomes lower, while the maximum loss increases.</p>

        </div>
    ),

    "Short Condor" : (
        <div className="custom-scrollbar" style={{ overflow: "auto", fontSize: "1rem", display: "inline", fontWeight: "normal", padding: "1rem", marginTop: "0rem" }}>
                        
            <p>The <span style={{ fontWeight: "bold"}}>Short Condor</span> can be viewed as a variation of the <span style={{ fontWeight: "bold"}}>Short Butterfly</span> options strategy, with the legs of the strategy using different strikes instead of a single one.</p>
            
            <p>The strategy is constructed using options with 4 different strikes, and can be designed in a number of ways (using only calls, only puts, or both) and be either a debit or credit strategy.</p>

        </div>
    ),
}

export default OptionStrategiesText;